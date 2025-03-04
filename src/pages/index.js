
import { Geist, Geist_Mono } from "next/font/google";
import Head from "./head";
import Main from "./main";
import Foot from "./foot";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <Head></Head>
    <Main></Main>
    <Foot></Foot>
    </>
  );
}
