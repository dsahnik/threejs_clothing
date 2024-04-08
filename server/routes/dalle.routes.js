import express from "express";
import * as dotenv from "dotenv";
import path from 'path'
import fs from 'fs';


//import {Configuration,OpenAIApi} from 'openai'
import OpenAI from "openai";

dotenv.config();

const router = express.Router();
const apikey = process.env.OPENAI_API_KEY;

router.get("/", (req, res) => {
  res.send("dalle api");
});

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  // const response = await openai.createImage({
  //       model: "dall-e-3",
  //       prompt: prompt,
  //       n: 1,
  //       size: "1024x1024",
  // response_format: 'b64_json'
  //     });
  // const image = response.data.data[0].url;

  //const image = response.data.data[0].b64_json;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${apikey}`);
  const raw = JSON.stringify({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  await fetch("https://api.openai.com/v1/images/generations", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const value = JSON.parse(result);
      const image = value.data[0].b64_json;
      res.status(200).json({ photo: image });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error: error });
    });
});

router.route("/dummy").post(async (req, res) => {
  const { prompt } = req.body;

  // async function testfunc() {
  //  const jsonString = `{
  //                 "created": 1712416707,
  //                 "data": [
  //                   {
  //                     "b64_json": "iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAA552NhQlgAADnnanVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAOcFqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3Vybjp1dWlkOjU2NDkzZmI4LTNmNTUtNDBhYy05N2E4LTM0YTY2NzJmZDNlMwAAAAGhanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAAxWp1bWIAAAAmanVtZGNib3IAEQAQgAAAqgA4m3E",
  //                     "revised_prompt": "A Siamese cat with a predominantly white coat, showcasing bright blue almond-shaped eyes. The cat is in a relaxed pose, basking in the sunlight filtering in from a nearby window. The cat's distinctive color points - its ears, face-mask, paws, and tail - are dark brown, providing a striking contrast to its impressively white fur. Details such as the cat's sleek, short coat, and lean yet muscular build can be easily observed. The colors, details, and overall atmosphere evoke a sense of serenity and elegance, typical of the Siamese breed."
  //                   }
  //                 ]
  //               }`;
  //   return jsonString;
  // }
  const filePath = path.resolve(process.cwd(), 'data.json');

  // Read JSON file
  await fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const value = JSON.parse(data);
      // res.json(jsonData);
     // const value = JSON.parse(result);
      const image = value.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // await testfunc()
  //   //.then((response) => response.text())
  //   .then((result) => {
     
  //     const value = JSON.parse(result);
  //     const image = value.data[0].b64_json;
  //     res.status(200).json({ photo: image });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({ message: "Something went wrong", error: error });
  //   });
});

export default router;
