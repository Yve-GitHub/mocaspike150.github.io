const fs = require('fs');
const yaml = require('js-yaml');
const PptxGenJS = require('pptxgenjs');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const pptx = new PptxGenJS();
const darkblue = '040d74';
const lightblue = 'd6dfee'; 
const input_dir = process.argv[2]  || '_stories';


pptx.defineSlideMaster({
  title: 'MOCA_EN',
  bkgd:  darkblue,
  objects: [
    { 'image': {
        path: 'https://www.mocaspike150.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', 
        x: 0.25, 
        y: 0.25,
        w: 2.5 * 272/272, 
        h: 2.5 * 85/272
      }
    }
  ]
});

pptx.defineSlideMaster({
  title: 'MOCA_CN',
  bkgd:  darkblue,
  objects: [
    { 
      'image': {
        path: 'https://www.mocaspike150.org/wp/uploads/2019/03/cropped-spike-150-logo-85-1.png', 
        x: 5.25, 
        y: 0.25, 
        w: 2.5 * 272/272, 
        h: 2.5 * 85/272
      }
    }
  ]
});


const add_en_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_EN');
  slide.addText(content, { 
    x: 0.25, 
    y: 1.25, 
    w: 4.5, 
    h: 4.0, 
    fontSize: 11, 
    fontFace: 'Arial', 
    fill: lightblue, 
    color: darkblue, 
    valign: 'top', 
    margin: '10px' 
  })

  slide.addImage({ 
    path: image,
    x:5.25, 
    y:0.25, 
    w: 750/750 * 4.5,
    h: 590/750 * 4.5
  });
}

const add_cn_slide = (image, title, date, content) => {
  const slide = pptx.addNewSlide('MOCA_CN');
  slide.addText(content, { 
    x: 5.25, 
    y: 1.25, 
    w: 4.5,
    h: 4.0, 
    fontSize: 11, 
    fontFace: 'Arial', 
    fill: lightblue, 
    color: 
    darkblue, 
    valign: 'top', 
    margin: '10px' 
  })

  slide.addImage({ 
    path: image,
    x: 0.25, 
    y: 0.25, 
    w: 750/750 * 4.5,
    h: 590/750 * 4.5
  });
}

for(let file of fs.readdirSync(input_dir)) {
  const input = `${input_dir}/${file}`
  console.log(input)
  const md = fs.readFileSync(input, 'utf-8').split('---');
  const doc = yaml.safeLoad(md[1]);
  const en = new JSDOM(doc['story-en']); 
  const cn = new JSDOM(doc['story-cn']); 
  const en_content = jquery(en.window)('p').text();
  const cn_content = jquery(cn.window)('p').text();
  add_en_slide(
    doc['post-image'],
    doc['title'],
    doc['date'],
    en_content
  )

  add_cn_slide(
    doc['post-image'],
    doc['title'],
    doc['date'],
    cn_content
  )
}

pptx.save('output.pptx');
