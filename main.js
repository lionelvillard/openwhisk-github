var fs = require('fs');
var cg = require('swagger-openwhisk-codegen').CodeGen;

var file = 'swagger.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var owSourceCode = cg.getOpenWhiskCode({
  className: '', swagger: swagger
});

if (!fs.existsSync('actions')) {
  fs.mkdirSync('actions');
}

let manifest = `name: github
packages:
  github:
    actions:`;

owSourceCode.forEach(action => {
  let fd = fs.openSync(`actions/${action.name}.js`, 'w');
  fs.writeSync(fd, action.code);
  fs.closeSync(fd);

  manifest = `${manifest}
      ${action.name}:
        kind: nodejs
        location: actions/${action.name}.js`;
});

let fd = fs.openSync('project.yml', 'w');
fs.writeSync(fd, manifest);
fs.closeSync(fd);
