import Navbar from "../ui/navbar";

export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar></Navbar>
        <main>{children}</main>
    </>
  );
}