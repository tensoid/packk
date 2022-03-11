#!/usr/bin/env node

const fs = require('fs');
const package = require('../package.json');
const UglifyJS = require("uglify-js");
const process = require('process');
const { join } = require('path');

const versioningString = `
  Packed with Packk v${package.version} by ${package.author}
  https://github.com/tensoid/packk\n`;


function printUsage(){
    console.log("\n");
    console.log("Usage: packk [option]");
    console.log("Options:");
    console.log("  <packk.json filepath>     Runs packk with the specified packk.json file");
    console.log("  init                      Creates a new packk.json template");
    console.log("  version                   Print version");
    console.log("\n");
}

function runPackk(filepath){
  
  const packkConfig = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  let finalString = "";


  // Versioning
  finalString += "/*" + versioningString + "*/\n\n";

  // Prefix
  if(packkConfig.prefix != "")
    finalString += "/*\n" + packkConfig.prefix + "\n*/\n\n";

  // Anonymous function begin
  if(packkConfig.anonamyze)
    finalString += "(() => {";  

  // Fetch and minify source files
  let code = {};

  packkConfig.files.forEach(file => {
    code[file] = fs.readFileSync(file).toString();
  });

  let result = UglifyJS.minify(code, {toplevel: true})

  if(result.error){
    console.error(result.error);
    process.exit(1);
  }
  if(result.warnings){
    console.warn(result.warnings);
  }
  
  finalString += result.code;

  // Anonymous function end
  if(packkConfig.anonamyze)
    finalString += "})();";



  fs.writeFileSync(packkConfig.output, finalString);
  console.log("Packed successfully into " + packkConfig.output);
}


// Parse arguments
const args = process.argv.slice(2);

if(args.length < 1){
  printUsage();
  process.exit(1);
}

else if(args[0] == "init"){
  fs.copyFileSync(join(__dirname, "..", "templates", "packk.json"), "packk.json");
  process.exit(1);
}

else if(args[0] == "version"){
  console.log(`Packk v${package.version}`);
  process.exit(1);
}


let filepath = args[0];

if(!fs.existsSync(filepath)){
  console.log(`File ${filepath} does not exist`);
  process.exit(1);
}

else runPackk(args[0]);





