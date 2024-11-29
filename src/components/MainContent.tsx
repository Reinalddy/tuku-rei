import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
// import { Tally3 } from "lucide";
import { Tally3 } from 'lucide-react';
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
    const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter();

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState<String>('all');
    const [curentPage, setCurentPage] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const itemPerpage: number = 20;


    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemPerpage}&skip=${(curentPage - 1) * itemPerpage}`;

        if(keyword) {
            url = `https://dummyjson.com/products/search?q=${keyword}`;
        }

        axios.get(url).then((res) => {
            setProducts(res.data.products);
            // console.log(res.data.products);
        }).catch((err) => {
            console.log(err);
            console.error("error fetching data");
        })
        


    }, [curentPage, keyword]);

    const getFilteredProducts = () => {
        let filteredProducts = products;
        if(selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product: any) => product.category === selectedCategory
            );
        }

        if(minPrice != undefined) {
            filteredProducts = filteredProducts.filter(
                (product: any) => product.price > minPrice
            )
        }

        if(maxPrice != undefined) {
            filteredProducts = filteredProducts.filter(
                (product: any) => product.price < maxPrice
            )
        }

        if(searchQuery) {
            filteredProducts = filteredProducts.filter(
                (product: any) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }


        switch(filter) {
            case 'cheap':
                filteredProducts.sort((a: any, b: any) => a.price - b.price);
                break;
            case 'expensive':
                filteredProducts.sort((a: any, b: any) => b.price - a.price);
                break;

            case 'popular':
                filteredProducts.sort((a: any, b: any) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return filteredProducts;

    };

    const filterproduct = getFilteredProducts();
    // console.log(filterproduct);
    const totalProduct = 100;
    const totalPages = Math.ceil(totalProduct / itemPerpage);

    const handlePageChange = (page: number) =>  {
        if(page > 0 && page <= totalPages) {
            setCurentPage(page);
        }
    }

    const getPaginationButtons = () => {
        const button:number[] = [];
        let startPage = Math.max(1, curentPage - 2); 
        let endPage = Math.min(totalPages, curentPage + 2);

        if(curentPage - 2 < 1) {
            endPage = Math.min(totalPages, endPage + (2 - curentPage - 1));
        }

        if(curentPage + 2 > totalPages) {
            startPage = Math.min(1, startPage - (2 - totalPages - curentPage));
        }

        for(let page = startPage; page < endPage; page++) {
            button.push(page);
        }

        return button;
    }

    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                           <Tally3 className="mr-2" />

                           {filter == 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                     Cheap
                                </button>
                                <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                     Expensive
                                </button>
                                <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                     Popular
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            
                <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {/* book cards */}
                    {filterproduct.map((product: any) => (
                        // <Bookcard ></Bookcard>
                        <BookCard 
                            key={product.id} 
                            id={product.id} 
                            title={product.title} 
                            image={product.thumbnail}
                            price={product.price}>
                        </BookCard>
                    ))}
                </div>       

                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                {/* previous */}
                <button className="border px-4 py-2 mx-2 rounded-full" onClick={() => handlePageChange(curentPage - 1)}
                    disabled={curentPage === 1}>Previus</button>
                
                {/* 1 2 3 4 */}
                <div className="flex flex-wrap justify-center">
                {/* pagination button */}
                {getPaginationButtons().map(page => (
                    <button key={page} onClick={() => handlePageChange(page)} 
                    className={`border px-4 py-2 mx-1 rounded-full ${page === curentPage ? 'bg-black text-white' : ''}`}>{page}</button>
                ))}
                </div>
                {/* next */}
                <button className="border px-4 py-2 mx-2 rounded-full" onClick={() => handlePageChange(curentPage + 1)}
                    disabled={curentPage === totalPages}>Next</button>

                </div>

            </div>
        </section>
    )
}

export default MainContent;