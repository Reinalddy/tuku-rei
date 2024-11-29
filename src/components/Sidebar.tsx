import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {

    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    } = useFilter();
    
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ]);

    useEffect( () => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
                // console.log(uniqueCategories);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
    }, []);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }

    const handleRadioCategoryChange = (category: string) => {
        setSelectedCategory(category);
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    }

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword('');
    }

    return (
        <div className="w-64 p-5 h-screen">
           <h1 className='text-2xl font-bold mb-10 mt-4'>Reinalddy Store</h1>

            <section>
                <input type="text"  className="border-2 rounded px-2 py-3 w-full sm:mb-0" placeholder='Search product'
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

                <div className='flex justify-center items-center mt-3'>
                    <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='min' 
                    value={minPrice ?? ''} onChange={(e) => handleMinPriceChange(e)}/>

                    <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='Max' 
                    value={maxPrice ?? ''} onChange={(e) => handleMaxPriceChange(e)}/>
                </div>

                {/* categories section */}
                <section>
                    <div className='mb-5'>
                        <h2 className='text-xl font-semibold mb-3'>Categories</h2>

                    {categories.map((category, index) => 
                        <label key={index} className='block mb-2'>
                            <input type="radio" name='category' value={category} className='mr-2 w-[16px] h-[16px]' 
                            onChange={() => handleRadioCategoryChange(category)}
                            checked={selectedCategory === category}
                            />

                            {category.toUpperCase()}
                        </label>
                    )}
                    </div>

                </section>

                {/* keywords section */}
                <div className='mb-5 mt-5'>
                    <h2 className='text-xl font-semibold mb-3'>keywords</h2>

                    {keywords.map((keyword, index) => 
                        <button key={index} className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200'
                        onClick={() => handleKeywordClick(keyword)}>
                            {keyword.toUpperCase()}
                        </button>
                    )}

                </div>

                <button className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5'
                onClick={handleResetFilters}>
                    Reset Filters
                </button>

            </section>
        </div>
    );
};


export default Sidebar;