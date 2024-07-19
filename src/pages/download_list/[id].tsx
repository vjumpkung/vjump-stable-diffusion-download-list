import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { client } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import copy from "copy-to-clipboard";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = async (ctx: any) => {
  const fetchurl = process.env.NEXT_PUBLIC_API_URL;
  const fet = await client.GET("/api/{id}", {
    params: {
      path: {
        id: ctx.query.id,
      },
    },
  });
  const res = fet.data;
  return { props: { data: res, fetchurl: fetchurl } };
};

export default function DetailsPage({
  data,
  fetchurl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>SD Download List - {data?.title}</title>
      </Head>
      <div className="py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/download_list">Public Download List</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/download_list/${data?._id}`}>{data?._id}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-wrap flex-col gap-5">
        <h1 className="text-6xl font-semibold">{data?.title}</h1>
        <h2 className="text-3xl font-semibold">Description</h2>
        <p>{data?.description}</p>
        <h3 className="text-2xl font-semibold">Shared by : {data?.author}</h3>
      </div>
      <div className="pt-5 flex flex-wrap justify-center">
        <Popover>
          <PopoverTrigger
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "default",
              })
            )}
            onClick={() => copy(`${fetchurl}api/${data?._id}`)}
          >
            Copy Download List Link
          </PopoverTrigger>
          <PopoverContent>Copied</PopoverContent>
        </Popover>
      </div>
      <div className="pt-5">
        <h3 className="text-4xl font-semibold">Model List</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center max-w-4xl mx-auto gap-5 py-5">
        {data?.download_list.map((model, idx) => {
          const previewImage = model.previewImage
            ? model.previewImage?.url
            : "/no_preview.svg";
          const nsfwCheck = model.previewImage
            ? model.previewImage?.nsfwLevel
            : 0;
          return (
            <Card className="mx-auto w-full" key={idx}>
              <CardHeader>
                <CardTitle className="truncate py-1 text-xl">
                  {model.name}
                </CardTitle>
                <CardDescription className="truncate">
                  version :{" "}
                  {model.version ? model.version : "No version provided."}
                  <br />
                  model-type : {model.DownloadModelType}
                  <br />
                  base-model :{" "}
                  {model.baseModel
                    ? model.baseModel
                    : "No base-model provided."}
                  <br />
                  source : {model.source}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div>
                    <Image
                      src={previewImage}
                      alt={"Preview Image"}
                      width={450}
                      height={450}
                      className={`h-96 w-auto object-contain ${
                        nsfwCheck >= 8 ? "blur-md" : ""
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center gap-4">
                <Link
                  href={model.modellink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Model Link</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}
