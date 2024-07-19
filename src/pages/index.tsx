import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>SD Download List - Home</title>
      </Head>
      <section className="w-full py-24 md:py-36 lg:py-48 xl:py-72">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              SD Download List
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl">
              แหล่งรวม Model ต่างๆ เพื่อสำหรับผู้ใช้งาน Stable Diffusion
            </p>
            <Button onClick={() => router.push("/download_list")}>
              Public SD Download List
            </Button>
            <br />
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Button className="mx-3 mt-6" variant={"outline"}>
                vjumpkung ComfyUI Colab
              </Button>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Button className="mx-3 mt-6" variant={"outline"}>
                vjumpkung A1111 WebUI Colab
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
