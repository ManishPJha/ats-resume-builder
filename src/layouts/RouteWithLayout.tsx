import Footer from './Footer';
import Header from './Header';

const RouteWithLayout = ({ element }: { element: React.JSX.Element }) => {
  return (
    <>
      <Header />
      <main>{element}</main>
      <Footer />
    </>
  );
};

export default RouteWithLayout;
