const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const asyncHandler = require("express-async-handler");

const SendMail = asyncHandler(async (email, subject, url) => {
  // console.log(email, subject, url);
  let msg;

  if (subject === "Email Verification") {
    msg = {
      to: email, // Change to your recipient
      from: "z3phyrondevs@gmail.com", // Change to your verified sender
      subject: subject,
      text: url,
      // html: `<strong>Email verification: ${url}</strong>`,
      html: `<!DOCTYPE html>
<html lang="en">

<head>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .box {
            display: grid;
            grid-gap: 10px;
            text-align: center;
            justify-content: center;
            width: 450px;
        }

        p {
            font-size: 20px;
        }

        img {
            width: 200px;
        }

        a {
            color: #fff;
            background: rgb(78, 15, 236);
            /* width: 150px; */
            padding: 10px 25px;
            border-radius: 8px;
            text-decoration: none;
            letter-spacing: 1px;
            margin: auto;
            transition: all .3s;
        }

        a:hover {
            background: rgb(125, 79, 242);
        }
    </style>
</head>

<body>
    <div class="box">
        <p>Hi there,</p>
        <p>Thank you for signing up for Render. Click on the link below to verify your email:
        </p>
        <div class="image">
            <img src="https://ci3.googleusercontent.com/proxy/AqvrfQf3z5oEEfSK-ns895tLpq4zIA49H8hKAd4YSvIPz2KeFT8axyACUdjP6w6iLJD5d7bNjULZlpy8OBREl9hH3lSHnHRvByJXyojmTKS7Ihn_oQcE9YO3Pg=s0-d-e1-ft#https://startupoi-dev.s3.ap-southeast-1.amazonaws.com/email/artboard.png"
                alt="">
        </div>

        <a
            href=${url}>Verify
            Email</a>
        <p>This link will expire in 24 hours. If you did not sign up for a {(company name)} account,
            you can safely ignore this email.</p>
    </div>





    The Company Name
</body>

</html>`,
    };
  }
  try {
    const sendMail = await sgMail.send(msg);
    // console.log("mail sent successfully", sendMail);
  } catch (error) {
    // console.log("Email not sent");
    throw new Error(error);
  }
});

module.exports = {
  SendMail,
};
