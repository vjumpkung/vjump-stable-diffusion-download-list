export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Created by vjumpkung
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-right">
          <a href="https://discord.com/users/250567674504019968">
            แจ้งปัญหา/ติดต่อ ได้ที่ Discord
          </a>
        </p>
      </div>
    </footer>
  );
}
