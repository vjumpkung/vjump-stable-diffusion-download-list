import Layout from "@/components/Layout";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { client } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import copy from "copy-to-clipboard";
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function paginate(current: number, max: number) {
  if (!current || !max) return null;

  let prev = current === 1 ? null : current - 1,
    next = current === max ? null : current + 1,
    items: Array<any> = [1];

  if (current === 1 && max === 1) return { current, prev, next, items };
  if (current > 4) items.push("...");

  let r = 2,
    r1 = current - r,
    r2 = current + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

  if (r2 + 1 < max) items.push("...");
  if (r2 < max) items.push(max);

  return { current, prev, next, items };
}

export const getServerSideProps = async (ctx: any) => {
  const fetchurl = process.env.NEXT_PUBLIC_API_URL;
  const fet = await client.GET("/api/get-public-download-list", {
    params: {
      query: {
        page: ctx.query.page ? ctx.query.page : 1,
        limit: 8,
      },
    },
  });
  const res = fet.data;
  return { props: { datas: res, fetchurl: fetchurl } };
};

export default function DownloadList({
  datas,
  fetchurl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isFirstPage = datas?.current_page == 1;
  const isLastPage = datas?.current_page == datas?.total_pages;
  const blankArray =
    (datas?.total_items as number) > 0
      ? paginate(datas?.current_page as number, datas?.total_pages as number)
      : null;

  return (
    <Layout>
      <Head>
        <title>SD Download List - Public Download List</title>
      </Head>
      <h1 className="text-4xl font-semibold py-5">Download List</h1>
      <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
        {datas?.data?.map((data) => {
          const previewImage = data.download_list[0].previewImage
            ? data.download_list[0].previewImage?.url
            : "/no_preview.svg";
          const nsfwCheck = data.download_list[0].previewImage
            ? data.download_list[0].previewImage?.nsfwLevel
            : 0;

          return (
            <Card className="mx-auto w-full" key={data._id}>
              <CardHeader>
                <CardTitle className="truncate py-1">{data.title}</CardTitle>
                <CardDescription className="truncate">
                  {data.description}
                  <br />
                  <span className="truncate">shared by : {data.author} </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div>
                    <Image
                      src={previewImage}
                      alt={"Preview Image"}
                      width={210}
                      height={210}
                      className={`h-52 w-auto object-contain ${
                        nsfwCheck >= 8 ? "blur-md" : ""
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "outline",
                      })
                    )}
                    onClick={() => copy(`${fetchurl}api/${data._id}`)}
                  >
                    Copy Link
                  </PopoverTrigger>
                  <PopoverContent>Copied</PopoverContent>
                </Popover>
                <Link href={`/download_list/${data._id}`}>
                  <Button size={"sm"}>Details</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className={`pt-3 pb-3 ${blankArray === null ? "hidden" : ""}`}>
        <Pagination>
          <PaginationContent>
            {isFirstPage ? null : (
              <PaginationItem>
                <PaginationPrevious
                  href={`/download_list?page=${
                    (datas?.current_page as number) - 1
                  }`}
                />
              </PaginationItem>
            )}
            {blankArray?.items.map((val, idx) => {
              if (typeof val === "number") {
                return (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href={`/download_list?page=${val}`}
                      isActive={(datas?.current_page as number) == val}
                    >
                      {val}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem key={idx}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
            })}
            {isLastPage ? null : (
              <PaginationItem>
                <PaginationNext
                  href={`/download_list?page=${
                    (datas?.current_page as number) + 1
                  }`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
}
