import MainHeader from "@/components/main-header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto relative'>
      <MainHeader />
      {children}
    </div>
  );
};
export default MainLayout;
