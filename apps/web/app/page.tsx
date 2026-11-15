
import Header from "./components/header/Header";
import Filtering from "./components/filtering/Filtering";
import ProductsShow from "./components/productsShow/ProductsShow";
export default function Home() {



  return (
    <main className="flex flex-col  min-h-screen ">
      <Header />
      <div className="px-5 sm:px-10 lg:px-20 py-10 md:py-15  flex flex-col min-h-[calc(100vh-80px)]   gap-10  ">
        <Filtering />
        <ProductsShow />
      </div>

    </main>
  )
}
