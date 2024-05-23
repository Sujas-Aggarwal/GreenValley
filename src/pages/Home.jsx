import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Home() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    async function handleSubmit(e) {
        setIsLoading(true);
        e.preventDefault();

        const options = {
            method: "GET",
            url: "https://website-contacts-scraper.p.rapidapi.com/scrape-contacts",
            params: {
                query: url,
                match_email_domain: "false",
                external_matching: "false",
            },
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_PUBLIC_KEY,
                "X-RapidAPI-Host": "website-contacts-scraper.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            if (response.data.status === "OK") {
                setData(response.data.data[0]);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }
    let navBar = ["Home", "About", "Tools"];
    return (
        <div
            id="Home"
            className="w-full h-full relative flex flex-col items-stretch"
        >
            {/* <div className="absolute right-5 sm:right-10 top-5 z-[1000] text-white font-[500]">
                <ul className="flex justify-center items-center gap-4 sm:gap-8">
                    {navBar.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={
                                        item.toLowerCase() == "home"
                                            ? "/"
                                            : `/${item.toLowerCase()}`
                                    }
                                >
                                    {item}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div> */}
            <div className="w-full h-[80vh] relative bg-[linear-gradient(#013220,#0B8A56)] flex justify-center items-center">
                <div className="absolute bottom-[-5px] left-0 w-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#0E6D47"
                            fillOpacity="1"
                            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,234.7C672,256,768,256,864,234.7C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
                <div className="flex z-[10] flex-col justify-center items-center ">
                    <div className="flex gap-4 justify-center items-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-[white]">
                            GreenValley
                        </h1>
                        <div className="w-[45px] h-[45px] bg-center bg-[url(/favicon.svg)] bg-no-repeat bg-cover rounded-full"></div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col justify-center items-stretch"
                    >
                        <input
                            type="url"
                            value={url}
                            required
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL Here"
                            className="p-2 sm:p-3 font-sans  mt-2 rounded-md w-full sm:w-[450px] outline-none select-none "
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="p-2 outline-none mt-1 font-light text-white rounded-md w-full bg-[#0B8A56]  active:bg-green-700 hover:bg-green-800 transition-all duration-300 ease-in-out"
                        >
                            {isLoading ? "Crawling..." : "Get Details"}
                        </button>
                        <p className="text-sm text-white self-center mt-2 font-bold">
                            Ad-Free Contact Info Gatherer
                        </p>
                    </form>
                </div>
            </div>
            {data && (
                <div className="w-[98%] sm:w-[80%] flex-col justify-center items-stretch self-center flex p-2 rounded-xl bg-green-950 m-2">
                    <div className="container mx-auto font-bold p-1 text-white sm:text-base text-sm">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Contact Information{" "}
                            <span className="text-xs sm:text-sm text-red-600">
                                {" ("}This information is highly prone to error
                                {")"}
                            </span>
                        </h1>
                        <div className=" rounded p-4">
                            <h2 className="text-md sm:text-xl font-semibold">
                                Domain: {data.domain}
                            </h2>

                            <div className="my-4">
                                <h3 className="text-lg font-semibold">
                                    Emails:
                                </h3>
                                <ul className="list-disc pl-5 sm:text-base text-xs">
                                    {data.emails.map((email, index) => (
                                        <li key={index} className="my-2">
                                            <p>{email.value}</p>
                                            {/* <ul className="list-none pl-5">
                                                {email.sources.map(
                                                    (source, idx) => (
                                                        <li key={idx}>
                                                            <a
                                                                href={source}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-white font-normal hover:underline"
                                                            >
                                                                {source}
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="my-4">
                                <h3 className="text-sm sm:text-lg font-semibold">
                                    Phone Numbers:
                                </h3>
                                <ul className="list-disc pl-5">
                                    {data.phone_numbers.map((phone, index) => (
                                        <li key={index} className="my-2 sm:text-base text-xs">
                                            <p>{phone.value}</p>
                                            {/* <ul className="list-none pl-2 sm:text-base text-[9px]">
                                                    {phone.sources.map(
                                                        (source, idx) => (
                                                            <li key={idx}>
                                                                <a
                                                                    href={
                                                                        source
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-white font-normal hover:underline"
                                                                >
                                                                    {source}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                            </ul> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="my-4">
                                <h3 className="text-lg font-semibold">
                                    Social Media:
                                </h3>
                                <ul className="list-none">
                                    {data.facebook && (
                                        <li>
                                            <a
                                                href={data.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-normal hover:underline"
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                    )}
                                    {data.instagram && (
                                        <li>
                                            <a
                                                href={data.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-normal hover:underline"
                                            >
                                                Instagram
                                            </a>
                                        </li>
                                    )}
                                    {data.twitter && (
                                        <li>
                                            <a
                                                href={data.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-normal hover:underline"
                                            >
                                                Twitter
                                            </a>
                                        </li>
                                    )}
                                    {data.youtube && (
                                        <li>
                                            <a
                                                href={data.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-normal hover:underline"
                                            >
                                                YouTube
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
