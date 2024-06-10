/* eslint-disable @typescript-eslint/no-var-requires */

const reqFsEx = require("fs-extra");
const reqPath = require("path");
const files = [];
const args = { name: "" };

process.argv.forEach((val) => {
  if (val.indexOf("=") !== -1) {
    const keyValue = val.split("=");
    args[keyValue[0]] = keyValue[1];
  }
});

Promise.all(files.map((file) => copyFile(file))).then(() =>
  createPackageFile()
);

function copyFile(file) {
  const buildPath = resolveBuildPath(file);
  return new Promise((resolve) => {
    reqFsEx.copy(file, buildPath, (err) => {
      if (err) throw err;
      resolve("");
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function resolveBuildPath(file) {
  return reqPath.resolve(__dirname, "../", reqPath.basename(file));
}

function createPackageFile() {
  return new Promise((resolve) => {
    reqFsEx.readFile(
      reqPath.resolve(__dirname, "../package.json"),
      "utf8",
      (err, data) => {
        if (err) throw err;
        resolve(data);
      }
    );
  })
    .then((data: string) => JSON.parse(data))
    .then((packageData) => {
      const {
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      } = packageData;

      const minimalPackage = {
        name: args.name,
        author,
        version,
        description,
        main: "index.js",
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      };

      return new Promise((resolve) => {
        const buildPath = reqPath.resolve(__dirname, "../package/package.json");
        const data = JSON.stringify(minimalPackage, null, 2);
        reqFsEx.writeFile(buildPath, data, (err) => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve("");
        });
      });
    });
}
