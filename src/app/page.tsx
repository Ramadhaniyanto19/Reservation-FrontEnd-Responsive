import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import logoBRI from "/public/logoBRI.svg";

async function getClub() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const clubData = await fetch(`${urlAPI}/api/v1/teams`);
  const dataClub = await clubData.json();
  return dataClub;
}

async function getNews() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const newsData = await fetch(`${urlAPI}/api/v1/news`);
  const dataNews = await newsData.json();
  return dataNews;
}

async function getMatchday() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const matchdayData = await fetch(`${urlAPI}/api/v1/matchday`);
  const dataMatchday = await matchdayData.json();
  return dataMatchday;
}

async function getHighlights() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const matchdayData = await fetch(`${urlAPI}/api/v1/highlights`);
  const dataMatchday = await matchdayData.json();
  return dataMatchday;
}

async function getStandigs() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const standings = await fetch(`${urlAPI}/api/v1/standings`);
  const dataStanding = await standings.json();
  return dataStanding;
}

async function getTopScore() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const topScorer = await fetch(`${urlAPI}/api/v1/statistics/topscorer`);
  const dataTopScore = await topScorer.json();
  return dataTopScore;
}
async function getGoolKeeperSave() {
  const urlAPI = process.env.NEXT_PUBLIC_API_URL;
  const topScorer = await fetch(`${urlAPI}/api/v1/statistics/goalkeeper_save`);
  const dataTopScore = await topScorer.json();
  return dataTopScore;
}

export default async function Home() {
  const club = await getClub();
  const news = await getNews();
  const matchday = await getMatchday();
  const withoutScore = Array.isArray(matchday.data)
    ? matchday.data.filter(
        (data: any) => data.score === "vs" || data.date === !undefined
      )
    : [];

  const standings = await getStandigs();
  const topScorer = await getTopScore();

  const goolKepper = await getGoolKeeperSave();
  const highlights = await getHighlights();
  const highlightsSlice = highlights.data.slice(0, 4);
  const dataKeeper = goolKepper.data[0];

  const playerTopScore = topScorer.data[0];

  console.log(highlights);
  const gameweeks = matchday.data.map((match: any) => match.gameweek);
  // console.log(gameweeks);

  return (
    <div className="flex flex-col w-min-full">
      <div className="flex bg-sky-700">
        <div className="flex header flex-row justify-between items-center  h-36 w-full">
          <div className="flex items-center">
            <Image src={logoBRI} alt="Next.js Logo" width={150} height={150} />
          </div>
          <div className="flex flex-col items-center justify-center text-white space-y-4 w-[1460px] h-28 mt-4 rounded-tl-3xl">
            <div className="flex flex-row">
              {Array.isArray(club.data) &&
                club.data.map((data: any) => (
                  <Image
                    key={data.team_id}
                    src={data.team_logo}
                    alt={data.team_name}
                    width={35}
                    height={35}
                  />
                ))}
            </div>
            <div className="flex justify-center min-w-full relative  bg-sky-600 backdrop-brightness-200 py-[1.6rem] rounded-tl-3xl">
              <div className="flex lg:space-x-20 xl:space-x-16 items-center justify-center -ml-64 gap-10">
                <Link href="/">
                  <h1>Home</h1>
                </Link>
                <Link href="/">
                  <h1>Kompetisi</h1>
                </Link>
                <Link href="/">
                  <h1>Jadwal</h1>
                </Link>
                <Link href="/">
                  <h1>Klasemen</h1>
                </Link>
                <Link href="/">
                  <h1>Klub</h1>
                </Link>
                <Link href="/">
                  <h1>Klasemen</h1>
                </Link>
              </div>
              <div className="flex justify-self-end end-0 absolute bg-sky-600">
                <select name="" id="" className="flex bg-sky-600">
                  <option value="">Indonesia (ID)</option>
                  <option value="">English (EN)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel */}
      <div className="flex min-w-full bg-abu-muda-300 w-full ">
        <div className="flex flex-col w-full mx-32  relative">
          <Carousel>
            <CarouselContent>
              {Array.isArray(news.data) &&
                news.data.map((data: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="w-full relative">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full h-[450px] object-contain"
                        width={100}
                        height={100}
                      />
                      <div className="bg-opacity-25 bg-abu-muda-300 w-full h-full">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-slate-400 rounded-3xl px-2 py-4 bg-opacity-30 -translate-y-1/2 text-slate-50 font-semibold opacity-95 text-3xl text-center">
                          {data.title}
                        </h1>
                        <Link href={data.url}>
                          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-28 text-white -translate-y-1/2 bg-sky-500 rounded-3xl px-5 py-3">
                            Lihat Selengkapnya {"-->"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              {/* <CarouselItem>
              <div className="flex w-full">
                <Image src="/logo.png" alt="Next.js Logo" width={100} height={100}/>
              </div>
            </CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      {/* End Carousel */}

      <div className="flex justify-between space-x-3 mx-8 mt-20 rounded-xl pb-72">
        <div className="flex flex-col h-full space-y-4">
          <div className="flex flex-col w-80 h-full border border-slate-300 rounded-xl">
            <div className="flex flex-row items-center justify-between bg-sky-500 w-full h-12 text-white">
              <Image
                src="/logo.png"
                alt="Next.js Logo"
                width={45}
                height={45}
              />
              <h1 className="mr-10">Matchweek {gameweeks[0]}</h1>
              <div className="flex"></div>
            </div>
            <h1 className="flex items-center text-sm text-center mx-12 font-light justify-center text-sky-800 py-3">
              All times shown are your local time
            </h1>
            {withoutScore.map((data: any, index: number) => (
              <div
                className="flex py-4 items-center justify-center space-x-8"
                key={index}
              >
                <Image
                  src={data.home_club_logo}
                  alt={data.home_club}
                  width={45}
                  height={45}
                />
                <h1>{data.time}</h1>
                <Image
                  src={data.away_club_logo}
                  alt={data.away_club}
                  width={45}
                  height={45}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2 w-80 pt-12">
            <div className="flex text-blue-500 text-xl font-semibold">
              <h1>Top Score</h1>
            </div>
            <div className="flex flex-col border border-slate-400 rounded-lg">
              <div className="flex relative items-center justify-center bg-gradient-to-br from-sky-500 to-sky-800">
                <Image
                  src={playerTopScore.avatar}
                  alt="Next.js Logo"
                  width={200}
                  height={200}
                />
                <Image
                  src={playerTopScore.club_logo}
                  alt="Next.js Logo"
                  width={60}
                  height={60}
                  className="absolute -bottom-7 left-1/2 mt-32 bg-slate-300 rounded-full -translate-x-1/2 "
                />
              </div>
              <div className="flex mt-10">
                <Table>
                  <TableBody>
                    {topScorer.data.map((data: any, index: number) => (
                      <TableRow key={index} className="items-center flex">
                        <TableCell className="font-medium w-10">
                          {data.position}
                        </TableCell>
                        <TableCell className="font-medium items-center flex">
                          <div className="flex items-center gap-2">
                            <Image
                              src={data.club_logo}
                              alt={data.team}
                              width={30}
                              height={30}
                            />
                            <h1 className="text-sm">{data.name}</h1>
                          </div>
                        </TableCell>
                        <TableCell className="">{data.goals}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 pt-12">
            <div className="flex text-blue-500 text-xl font-semibold">
              <h1>Top GoolKeeper Save</h1>
            </div>
            <div className="flex flex-col border border-slate-400 rounded-lg">
              <div className="flex relative items-center justify-center bg-gradient-to-br from-sky-500 to-sky-800">
                <Image
                  src={dataKeeper.avatar}
                  alt="Next.js Logo"
                  width={200}
                  height={200}
                />
                <Image
                  src={dataKeeper.club_logo}
                  alt="Next.js Logo"
                  width={60}
                  height={60}
                  className="absolute -bottom-7 left-1/2 mt-32 bg-slate-300 rounded-full -translate-x-1/2 "
                />
              </div>
              <div className="flex mt-10">
                <Table>
                  <TableBody>
                    {goolKepper.data.map((data: any, index: number) => (
                      <TableRow key={index} className="items-center flex">
                        <TableCell className="font-medium w-10">
                          {data.position}
                        </TableCell>
                        <TableCell className="font-medium items-center flex w-64">
                          <div className="flex items-center gap-2">
                            <Image
                              src={data.club_logo}
                              alt={data.team}
                              width={30}
                              height={30}
                            />
                            <h1>{data.name}</h1>
                          </div>
                        </TableCell>
                        <TableCell className="">{data.goals}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-auto h-full">
          <div className="flex flex-col w-[800px] h-full border border-slate-300 rounded-xl pb-16 shadow-lg">
            <div className="flex flex-row items-center justify-between bg-sky-500 w-full h-12 text-white">
              <h1 className="mr-10 text-xl font-semibold ml-4">
                Berita Liga 1 2023-2024
              </h1>
            </div>
            <div className="flex flex-col gap-8 ml-4 mt-6">
              {news.data.map((data: any, index: number) => (
                <div className="flex space-x-7" key={index}>
                  <Image
                    src={data.thumbnail}
                    alt={data.title}
                    width={200}
                    height={200}
                    className="w-44 h-32 rounded-lg"
                  />
                  <div className="flex flex-col text-blue-500 space-y-2">
                    <h1 className="text-xs bg-blue-500 w-36 text-white font-semibold">
                      BRI LIGA 1 2023-2024
                    </h1>
                    <h1 className="text-lg font-semibold">{data.title}</h1>
                    <Link href={data.url}>
                      <button className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white">
                        Selengkapnya
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-12 border border-slate-300  bg-white rounded-xl">
            <div className="flex items-center rounded-t-xl bg-sky-500 w-full h-12 text-xl text-white font-bold">
              <h1 className="ml-3">Highlights</h1>
            </div>
            <div className="flex h-auto pb-10 space-y-2 mx-2 flex-col">
              {highlights.data.slice(0, 4).map((data: any, index: number) => (
                <>
                  <div className="flex ">
                    <Image
                      src={data.thumbnail}
                      alt={data.title}
                      key={index}
                      width={100}
                      height={100}
                      className="w-full object-cover rounded-xl mt-2"
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-96 border border-slate-300">
          <div className="flex flex-col items-center justify-center text-slate-100 bg-sky-500">
            <h1 className="text-xl">Klasemen</h1>
            <h1 className="text-base">BRI LIGA 1 2023-2024</h1>
          </div>
          <div className="flex-col flex">
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead className="w-[2px] text-center">Pos</TableHead>
                  <TableHead className="">Club</TableHead>
                  <TableHead className="w-16 text-center pl-12">Pl</TableHead>
                  <TableHead className="text-center w-12">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.data.map((data: any, index: number) => (
                  <TableRow
                    key={index}
                    className="items-center justify-center text-center"
                  >
                    <TableCell className="font-medium">
                      {data.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-between gap-2 items-center">
                        <Image
                          src={data.logo}
                          alt={data.club}
                          width={40}
                          height={35}
                        />{" "}
                        <h1 className="text-xs">{data.club}</h1>
                      </div>
                    </TableCell>
                    <TableCell className="pl-12">{data.matches}</TableCell>
                    <TableCell className="text-right">{data.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
