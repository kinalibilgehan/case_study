import { useState } from "react";
import { useEffect } from "react";
import { Stack, Box, Text, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { Button } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFlightStore from "../Store/flightStore";
import "react-datepicker/dist/react-datepicker.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

function HomePage() {
  const [airports, setAirports] = useState(null);
  const [value, setValue] = useState("2");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [flightDate, setFlightDate] = useState("");
  const [loading, setLoading] = useState(false);

  const setFlights = useFlightStore((state) => state.setFlights);

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const handleStartDate = (date) => {
    const dateString = date.toLocaleDateString("en-US", options);
    console.log(dateString);
    setStartDate(date);
    setFlightDate(dateString);
    return dateString;
  };

  const handleFromSearch = (event) => {
    setFromSearch(event.target.value);
    console.log(fromSearch);
  };

  const handleToSearch = (event) => {
    setToSearch(event.target.value);
    console.log(toSearch);
  };

  const filterFlights = (flights) => {
    let filters = { from: fromSearch, to: toSearch, date: flightDate };

    let fitFlights = flights.filter((flight) => {
      if (filters.from.toLowerCase() !== flight.from.toLowerCase()) {
        return false;
      }
      if (filters.to.toLowerCase() !== flight.to.toLowerCase()) {
        return false;
      }
      if (filters.date.toLowerCase() !== flight.flightDate.toLowerCase()) {
        return false;
      }
      return true;
    });
    return fitFlights;
  };

  const handleSearchButton = async () => {
    let filters = { from: fromSearch, to: toSearch, date: startDate };

    if (
      !filters.from.length > 0 ||
      !filters.to.length > 0 ||
      !filters.startDate.length > 0
    ) {
      console.error("Please provide valid values for filters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      fetch("/api/flights")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setFlights(filterFlights(data.flightsAvailable));
        });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetch("/api/airports")
      .then((res) => {
        return res.json();
      })
      .then()
      .then((data) => {
        console.log(data.airportsAvailable);
        setAirports(data.airportsAvailable);
      })
      .catch((error) => {
        console.error("Error fetching airports", error);
      });
  }, []);

  useEffect(() => {
    // Check if airports is not null and has at least one element
    if (airports && airports.length > 0) {
      console.log("Airports state:", airports[0].code);
    }
  }, [airports]);

  return (
    <>
      <Box bg={"#f5f5f5"} h={"30vh"} borderRadius={10}>
        {/* TEK YÖN - ÇİFT YÖN */}
        <Box display={"flex"} justifyContent={"space-between"}>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Box
                bg={"white"}
                m={"20px"}
                borderRadius={20}
                border={"1px solid black"}
              >
                <Radio m={"20px"} pr={"60px"} value="2">
                  <Text color={"black"}>Çift Yön</Text>
                </Radio>
              </Box>
              <Box
                border={"1px solid black"}
                m={"20px"}
                bg={"white"}
                borderRadius={20}
              >
                <Radio m={"20px"} pr={"60px"} value="1">
                  <Text color={"black"}>Tek Yön</Text>
                </Radio>
              </Box>
            </Stack>
          </RadioGroup>
          <Text color={"black"} m={"40px"}>
            1 Kişi / Ekonomi
          </Text>
        </Box>

        {/* ARAMA */}
        <Box display={"flex"}>
          <VStack position={"relative"}>
            <Text m={0} p={0} color={"black"}>
              Nereden
            </Text>

            <Input
              border={"1px solid black"}
              color={"black"}
              onChange={handleFromSearch}
              placeholder="kalkış hav"
              w={"200px"}
              ml={"20px"}
              _placeholder={{ color: "black" }}
              bg={"white"}
              value={fromSearch}
            />

            {airports && fromSearch.length >= 1 && (
              <>
                <Box position={"absolute"} top={"100%"} bg={"white"}>
                  {airports.map((city, index) => {
                    const cityValues = Object.values(city);
                    if (
                      cityValues.some((value) =>
                        value.toLowerCase().includes(fromSearch.toLowerCase())
                      )
                    ) {
                      return (
                        <Text color={"black"} key={index} px={20}>
                          {city.city}
                        </Text>
                      );
                    }
                    return null;
                  })}
                </Box>
              </>
            )}
          </VStack>

          <VStack position={"relative"}>
            <Text m={0} p={0} color={"black"}>
              Nereye
            </Text>
            <Input
              border={"1px solid black"}
              color={"black"}
              onChange={handleToSearch}
              placeholder="varış hav"
              w={"200px"}
              ml={"20px"}
              _placeholder={{ color: "black" }}
              bg={"white"}
              value={toSearch}
            />

            {airports && toSearch.length >= 1 && (
              <>
                <Box position={"absolute"} top={"100%"} bg={"white"}>
                  {airports.map((city, index) => {
                    const cityValues = Object.values(city);
                    if (
                      cityValues.some((value) =>
                        value.toLowerCase().includes(toSearch.toLowerCase())
                      )
                    ) {
                      return (
                        <Text color={"black"} key={index} px={20}>
                          {city.city}
                        </Text>
                      );
                    }
                    return null;
                  })}
                </Box>
              </>
            )}
          </VStack>

          <VStack>
            <Text color={"black"}>Gidiş</Text>
            <Box
              ml={"20px"}
              p={"10px"}
              bg={"white"}
              alignSelf={"center"}
              borderRadius={10}
              border={"1px solid black"}
            >
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDate(date)}
                customInput={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <input
                      value={startDate}
                      style={{ backgroundColor: "white", color: "black" }}
                      readOnly
                    />
                  </div>
                }
              />
            </Box>
          </VStack>

          {value === "2" && (
            <VStack>
              <Text color={"black"}>Dönüş</Text>
              <Box
                border={"1px solid black"}
                ml={"20px"}
                p={"10px"}
                bg={"white"}
                alignSelf={"center"}
                borderRadius={10}
              >
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <input
                        value={endDate}
                        style={{ backgroundColor: "white", color: "black" }}
                        readOnly
                      />
                    </div>
                  }
                />
              </Box>
            </VStack>
          )}
        </Box>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Link to="/ListPage">
            <Button
              isLoading={loading}
              onClick={handleSearchButton}
              bg={"red"}
              size={"lg"}
              m={"20px"}
              variant={"outline"}
              _hover={{ bg: "red" }}
            >
              Ara
            </Button>
          </Link>
        </Box>
        <Box></Box>
      </Box>
    </>
  );
}

export default HomePage;
