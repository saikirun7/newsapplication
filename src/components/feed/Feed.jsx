import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import NewsArticle from '../newsarticle/NewsArticle';
import Search from '../search/Search';
import Pagination from '../pagination/Pagination';

function Feed() {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        source: "",
        category: "general",
        country: "in",
        date: "no",
    })
    const [selectedCountry, setSelectedCountry] = useState("in");
    const [selectedCategory, setSelectedCategory] = useState("general");

    const fetchData = async (link) => {
        try {
            const response = await axios.get(link);
            console.log(response.data.articles);
            setNews(response.data.articles);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const url = "https://newsapi.org/v2/top-headlines?"
        const apiKey = "&apiKey=ceabf55d5ffb4ca89ccb3ce167354b2c";
        const query = `country=${filters.country}&category=${filters.category}${apiKey}`

        if (filters) {
            fetchData(`${url}${query}`);
        }
    }, [filters]);

    useEffect(() => {
        const apiKey = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=ceabf55d5ffb4ca89ccb3ce167354b2c`

        const fetchSearchData = async () => {
            try {
                const response = await axios.get(`${apiKey}`);
                console.log(response.data.articles);
                setNews(response.data.articles);
            } catch (error) {
                console.error(error);
            }
        };

        if (searchTerm) {
            //setCurrentPage(1);
            fetchSearchData();
        }
    }, [searchTerm]);

    const countries = [
        { key: "in", value: "India" },
        { key: "us", value: "United States" },
        { key: "cn", value: "China" },
        { key: "at", value: "Austria" },
        { key: "ca", value: "Canada" },
        { key: "eg", value: "Egypt" },
        { key: "fr", value: "France" },
        { key: "hk", value: "Hong Kong" },
        { key: "ru", value: "Russia" },
        { key: "sg", value: "Singapore" },
        { key: "pk", value: "Pakistan" },
        { key: "ae", value: "UAE" },
    ];

    const categories = [
        { key: "business", value: "Business" },
        { key: "entertainment", value: "Entertainment" },
        { key: "health", value: "Health" },
        { key: "science", value: "Science" },
        { key: "general", value: "General" },
        { key: "sports", value: "Sports" },
        { key: "technology", value: "Technology" },
    ];

    const handleCountryChange = useCallback(function (event) {
        const newCountry = event.target.value;
        setSelectedCountry(newCountry);
        setFilters((prevValue) => ({
            ...prevValue,
            country: newCountry,
        }));
    }, []);

    const handleCategoryChange = useCallback(function (event) {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        setFilters((prevValue) => ({
            ...prevValue,
            category: newCategory,
        }));
    }, []);

    const inputRef = useRef();

    const handleSearch = useCallback(function () {
        setSearchTerm(inputRef.current.value);
    }, []);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexofFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = news.slice(indexofFirstItem, indexOfLastItem);


    const handlePageClick = useCallback((selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    }, []);

    return (
        <div>
            <div className='container-fluid text-center'>
                <div className='row justify-content-center'>
                    <div className='col-sm-12 col-md-12 col-lg-6 py-3'>
                        <Search handleSearch={() => handleSearch()} inputRef={inputRef} />
                    </div>
                </div>
            </div>
            <div className='container-fluid text-center'>
                <form action="">
                    <div className='row justify-content-around'>
                        <div className='col-sm-12 col-md-12 col-lg-6'>
                            <Button className='fw-normal p-2 rounded text-white'>Filter By</Button>
                            <FormControl className='px-2'>
                                <InputLabel>Country</InputLabel>
                                <Select label="Country" value={selectedCountry} onChange={handleCountryChange} >
                                    {countries?.map((country) => (
                                        <MenuItem key={country.key} value={country.key}>
                                            {country.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className='px-2'>
                                <InputLabel>Category</InputLabel>
                                <Select label="Category" value={selectedCategory} onChange={handleCategoryChange} >
                                    {categories?.map((category) => (
                                        <MenuItem key={category.key} value={category.key}>
                                            {category.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                    </div>
                </form>
            </div>

            <div className='container pt-3'>
                <p className='fs-3 fw-bolder' id='top-headlines'>
                    Top Headlines
                </p>
            </div>
            <NewsArticle news={currentNews} />


            <br /><br />
            <Stack>
                {news.length > itemsPerPage && (
                    <Pagination
                        pageCount={Math.ceil(news.length / itemsPerPage)}
                        currentPage={currentPage - 1}
                        handlePageClick={handlePageClick}
                    />
                )}
            </Stack>
        </div>
    )
}

export default Feed