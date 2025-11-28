#!/usr/bin/env node

const DOMAIN = "gg-drive.org";

function hasFetch() {
  return typeof fetch === "function";
}

async function main() {
  const token = process.env.VERCEL_TOKEN || "S6yTC5QjDXEyWZnDpxngbDB0";
  const teamId = process.env.VERCEL_TEAM_ID || "team_Ul4HzHdRamNu2svNVJ6jh2wY";
  const args = process.argv.slice(2);
  const shouldDelete = args.includes("--yes") || args.includes("-y");

  if (!token) {
    console.error("VERCEL_TOKEN environment variable is required.");
    process.exit(1);
  }

  if (!hasFetch()) {
    console.error(
      "Global fetch is not available. Run this script with Node 18+ or add a fetch polyfill."
    );
    process.exit(1);
  }

  const projects = await listAllProjects({ token, teamId });
  if (!projects.length) {
    console.log("No projects found for this account/team.");
    return;
  }

  const matches = [];

  for (const project of projects) {
    const domains = await listProjectDomains({
      token,
      teamId,
      idOrName: project.id,
    });
    const matchingDomains = domains.filter((d) =>
      isDomainMatch(d.name, DOMAIN)
    );

    if (matchingDomains.length) {
      matches.push({
        project,
        domains: matchingDomains,
      });
    }
  }

  if (!matches.length) {
    console.log(`No projects found with domains matching ${DOMAIN}.`);
    return;
  }

  console.log("The following projects use gg-drive.org (or its subdomains):\n");
  for (const { project, domains } of matches) {
    console.log(`- ${project.name} (${project.id})`);
    console.log(
      `  Domains: ${domains.map((d) => d.name).join(", ") || "(none)"}`
    );
  }

  if (!shouldDelete) {
    console.log(
      "\nDry run only. Re-run this script with --yes (or -y) to actually delete these projects."
    );
    return;
  }

  console.log("\nDeleting matching projects...\n");

  for (const { project } of matches) {
    try {
      await deleteProject({ token, teamId, idOrName: project.id });
      console.log(`Deleted project: ${project.name} (${project.id})`);
    } catch (error) {
      console.error(
        `Failed to delete project ${project.name} (${project.id}):`,
        error instanceof Error ? error.message : error
      );
    }
  }
}

function isDomainMatch(name, rootDomain) {
  if (!name || !rootDomain) return false;
  if (name === rootDomain) return true;
  return name.endsWith(`.${rootDomain}`);
}

async function listAllProjects({ token, teamId }) {
  const projects = [];
  let nextFrom = undefined;

  while (true) {
    const searchParams = new URLSearchParams();
    searchParams.set("limit", "100");
    if (nextFrom !== undefined && nextFrom !== null) {
      searchParams.set("from", String(nextFrom));
    }
    if (teamId) {
      searchParams.set("teamId", teamId);
    }

    const url = `https://api.vercel.com/v9/projects?${searchParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const body = await safeJson(res);
      throw new Error(
        `Failed to list projects: ${res.status} ${
          res.statusText
        } - ${JSON.stringify(body)}`
      );
    }

    const json = await res.json();
    if (Array.isArray(json.projects)) {
      projects.push(...json.projects);
    }

    const pagination = json.pagination || {};
    if (!pagination.next && pagination.next !== 0) {
      break;
    }
    nextFrom = pagination.next;
  }

  return projects;
}

async function listProjectDomains({ token, teamId, idOrName }) {
  const searchParams = new URLSearchParams();
  if (teamId) {
    searchParams.set("teamId", teamId);
  }
  const qs = searchParams.toString();
  const url = `https://api.vercel.com/v9/projects/${encodeURIComponent(
    idOrName
  )}/domains${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(
      `Failed to list domains for project ${idOrName}: ${res.status} ${
        res.statusText
      } - ${JSON.stringify(body)}`
    );
  }

  const json = await res.json();
  return Array.isArray(json.domains) ? json.domains : [];
}

async function deleteProject({ token, teamId, idOrName }) {
  const searchParams = new URLSearchParams();
  if (teamId) {
    searchParams.set("teamId", teamId);
  }
  const qs = searchParams.toString();
  const url = `https://api.vercel.com/v9/projects/${encodeURIComponent(
    idOrName
  )}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(
      `Failed to delete project ${idOrName}: ${res.status} ${
        res.statusText
      } - ${JSON.stringify(body)}`
    );
  }
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
