// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');

    // Add click event listener to the "Generate PDF" button
    generateBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Get the form field values
        const imonth = document.getElementById('imonth').value;
        const month = document.getElementById('month').value;
        const division = document.getElementById('division').value;
        const name = document.getElementById('name').value;
        const kabina = document.getElementById('kabina').value;
        const halka1 = document.getElementById('halka1').value;
        const to1 = document.getElementById('to1').value;
        const from1 = document.getElementById('from1').value;

        //  PDF form template
        const pdfUrl = 'form1.pdf';
        const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());


        // Create a new PDF document
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        // Get the first page of the PDF document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Set the font and font size
        const arialFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
        const fontSize = 14;


        // Place the form field values
        firstPage.drawText(imonth, { x: 125, y: 520, size: fontSize, font: arialFont });
        firstPage.drawText(month, { x: 250, y: 520, size: fontSize, font: arialFont });
        firstPage.drawText(division, { x: 680, y: 520, size: fontSize, font: arialFont });
        firstPage.drawText(name, { x: 215, y: 498, size: fontSize, font: arialFont });
        firstPage.drawText(kabina, { x: 678, y: 498, size: fontSize, font: arialFont });
        firstPage.drawText(halka1, { x: 325, y: 298, size: fontSize, font: arialFont });
        firstPage.drawText(to1, { x: 322, y: 276, size: fontSize, font: arialFont });
        firstPage.drawText(from1, { x: 372, y: 276, size: fontSize, font: arialFont });

        // Serialize the modified PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Create a Blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a download link for the filled PDF form
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'filled_form1.pdf';
        downloadLink.click();
    });
});