import fs from "fs";
import showdown from "showdown";
import Walker from "@xinghunm/walk-dir";

const walkSource = () => {
  const walker = new Walker();
  walker.workSync("./source/_posts");
  const files = walker.getFilesPath();
  return files;
};

const getArticles = files => {
  const articles = [];
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    let content = fs.readFileSync(filePath, "utf8");
    const splits = content.split("---");
    content = splits[2];
    const match = filePath.match(/\.(.*)\.md/);
    const name = match[1];
    articles.push({ name, content });
  }
  return articles;
};

const generateHtmls = articles => {
  const buildDir = "./build";
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  const converter = new showdown.Converter();
  for (let i = 0; i < articles.length; i++) {
    const { name, content } = articles[i];
    const html = converter.makeHtml(content);
    const fileName = `${buildDir}/${name}.html`;
    fs.writeFileSync(fileName, html, "utf8");
  }
  return articles;
};

const startGenerate = (() => {
  const files = walkSource();
  const articles = getArticles(files);
  generateHtmls(articles);
  console.log(`Generate htmls succss, files count: ${files.length} !!!`);
})();
