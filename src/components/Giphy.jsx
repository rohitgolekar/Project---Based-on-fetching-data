import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Paginate from './Paginate';

function Giphy() {
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isErr, setisErr] = useState(false);
    const [search, setSearch] = useState("");

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(20);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        const fetchData = async () => {
            setisLoading(true);

            try {
                const result = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: 'DPASB7qKnu33kScALbgAJQ7QAPZBu2YF',
                        limit: 100,
                    }
                });
                console.log(result);
                setData(result.data.data)
            } catch (err) {
                setisErr(true);
                console.log(err)
            }
            setisLoading(false);
        };

        fetchData();
    }, [])


    if (isLoading) {
        return <Loader />;
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setisErr(false);
        setisLoading(true);

        try {
            const result = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "DPASB7qKnu33kScALbgAJQ7QAPZBu2YF",
                    q: search,
                    limit: 100,
                }
            });

            setData(result.data.data);
        } catch (err) {
            setisErr(true);
            console.log(err);
        }
        setisLoading(false);
    }


    const pageSelected = (pageNumbers) => {
        setcurrentPage(pageNumbers);
    }
    return (
        <>
            <div className="container my-5 bg-dark p-4 " style={{ boxShadow: "2px 2px 12px 0px" }}>
                <div className="row mx-auto">
                    <form className="form-inline my-5 text-center">
                        <input value={search} onChange={handleSearch} type="text" placeholder="search" className="form-control w-50  d-inline" />
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary mx-2 mb-1 ">Go</button>
                    </form>
                    <Paginate 
                    pageSelected={pageSelected}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={data.length} />
                    {
                        currentItems.map(item => {
                            return (
                                <div key={item.id} className="col-md-2">
                                    <img className="img-fluid" src={item.images.fixed_height.url} alt={item.images.type} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Giphy
