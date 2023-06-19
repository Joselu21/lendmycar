import Menu from "../../components/Menu/Menu";

const MainLayout = ({ children }) =>
{
    return (
        <>
            <Menu />
            {children}
        </>
    );
}

export default MainLayout;