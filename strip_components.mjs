import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app/(marketing)', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // We remove `<Navbar />` and `<Footer />` and their imports
    content = content.replace(/<Navbar \/>\s*/g, '');
    content = content.replace(/<Footer \/>\s*/g, '');
    content = content.replace(/import\s*{\s*Navbar\s*}\s*from\s*['"]@\/components\/Navbar['"];?\s*/g, '');
    content = content.replace(/import\s*{\s*Footer\s*}\s*from\s*['"]@\/components\/Footer['"];?\s*/g, '');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Stripped Navbar and Footer from marketing pages.');
