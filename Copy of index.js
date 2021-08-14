let name = document.getElementById('name');
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "TSStudetn2020"+credentialUser.toString();
    generetPdf(name.value,str);
    name.value = '';
})


const generetPdf = async (name,cr)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./Certificate.pdf").then((res)=>{
        return res.arrayBuffer()
    });

    const exFont = await fetch('./Ubuntu-Regular.ttf').then((res)=>{
        return res.arrayBuffer();
    })


    
    
    const pdfDoc = await PDFDocument.load(exBytes)
    
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstP = pages[0];
    firstP.drawText(name,{
        x:300,
        y:285,
        size:40,
        font:myFont,
        color: rgb(0.1, 0, 0.1)
    })

    firstP.drawText(cr,{
        x:600,
        y:45,
        size:10,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,"Certificate.pdf",{autoBom:true})
    // document.querySelector("#myPDF").src = uri;
};