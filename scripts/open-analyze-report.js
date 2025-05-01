import { existsSync } from "fs";
import open, { apps } from "open";
import { join } from "path";

const projectRoot = process.cwd();

const statsReportPath = join(projectRoot, "dist/stats.html");

const statsReportExists = existsSync(statsReportPath);

if (!statsReportExists) {
  console.error(
    "Stats report not found. Please run the analyze command first.",
  );
  process.exit(1);
}

try {
  console.log("Opening the report...");
  await open(statsReportPath, {
    app: {
      name: [apps.browser],
    },
  });
  console.log(
    "Report opened successfully, your default browser will now open the report.",
  );
  console.warn(
    "Sometimes it takes a couple of seconds to open the report, please be patient.",
  );
} catch (error) {
  console.error("Failed to open the report:", error);
  process.exit(1);
}
