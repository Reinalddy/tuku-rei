import { useEffect, useState } from "react";


interface Author {
    name: string;
    isFolowing: boolean;
    image: string;
}

const TopSeller = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=5`);
                const data = await response.json();
                const authorData: Author[] = data.results.map((user:any) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    isFolowing: false,
                    image: user.picture.medium
                }));

                setAuthors(authorData);


            } catch (error) {
                console.error(`error fetching data: ${error}`);
            }
        }

        fetchData();
    },[]);

    const handleFollowClick = (index: number) => {
        setAuthors((prevAuthor => prevAuthor.map((author, i) => i === index ? {...author, isFolowing: !author.isFolowing} : author)));
    }

    return (
        <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
            <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

            <ul>
                {authors.map((author, index) => 
                    <li key={index} className="flex items-center justify-between mb-4">
                        <section className="flex justify-center items-center">
                            <img src={author.image} alt={author.name} className="w-[25%] h-[25%] justify-center" />
                            <span className="ml-4">{author.name}</span>
                        </section>

                        <button className={`py-1 px-3 rounded ${author.isFolowing ? "bg-red-500 text-white" : "bg-black text-white"}`}
                         onClick={() => handleFollowClick(index)}>{author.isFolowing ? "Following" : "Follow"}</button>
                    </li>
                )}
            </ul>
            
        </div>
    );
}

export default TopSeller;
