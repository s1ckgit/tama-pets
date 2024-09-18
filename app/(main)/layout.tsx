import MainHeader from "@/components/main-header";
import SessionHOC from "@/components/session-hoc";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto relative'>
      <SessionHOC Component={MainHeader} />
      {children}
    </div>
  );
};
export default MainLayout;
