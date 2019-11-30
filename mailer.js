var fs = require('fs');
var csv = require('fast-csv');
var HummusRecipe = require('hummus-recipe');
var nodemailer = require('nodemailer');
var list = []
fs.createReadStream('/nodeMailer/Test.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', row => list.push(row))

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mail',
    pass: 'password'
  }
});



setTimeout(
function mail (){
  console.log('the list to send to (check the example test file) ',list)
  list.forEach(function (to, i, array)
  {
    var pdfDoc = new HummusRecipe('file to use and send', `certificate of attendance ${list[i].Name}.pdf`);
    pdfDoc
      .editPage(1)
      .text(`${to.Name}`,'center', 335, {
        color: '#000000',
        fontSize: 30,
        bold: true,
        align: 'center center',
        font: 'Roboto',
    })
      .endPage()
      .endPDF();
        var mailOptions = {
          from: 'sending mail',
          to: to.Email,
          subject: 'Certificat de participation au Workshop “ Create your own game with Unity”',
          html: 'Html mail goes here <br></br>' +
          '<br></br>' +
          'Thank you <br></br>.',
          attachments: [{path:`/nodeMailer/certificate of attendance ${list[i].Name}.pdf`}]
        };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  })
 
}, 2000)