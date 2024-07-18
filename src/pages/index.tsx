import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
              แหล่งรวม Model ต่างๆ เพื่อสำหรับผู้ที่เริ่มต้นใช้งาน Stable
              Diffusion
            </p>
            <Button>
              <Link href="/download_list">
                ดูรายการ SD Model Pack ที่มีการ share ทั้งหมด
              </Link>
            </Button>
            <br />
            <Button>
              <Link href="#">vjumpkung ComfyUI Colab</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
