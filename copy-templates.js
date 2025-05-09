const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) {
    console.error('Source folder not found:', source);
    return;
  }

  const files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target);
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    const items = fs.readdirSync(source);
    items.forEach(item => {
      const curSource = path.join(source, item);
      const curTarget = path.join(target, item);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

copyFolderRecursiveSync('src/mail/templates', 'dist/mail/templates');
