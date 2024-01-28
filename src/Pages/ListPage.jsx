import React, { useEffect } from "react";
import useFlightStore from "../Store/flightStore";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { FaPlaneDeparture } from "react-icons/fa";
import { Divider } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

const ListPage = () => {
  const setFlights = useFlightStore((state) => state.setFlights);

  const flights = useFlightStore((state) => state.flights);
  const [priceOrder, setPriceOrder] = useState("");

  const handlePriceOrder = (value) => {
    if (value === "0") {
      console.log(value);
      const sortedFlightsAscending = flights
        .slice()
        .sort((a, b) => a.price - b.price);
      setFlights(sortedFlightsAscending);
      flights;
      console.log(sortedFlightsAscending);
    } else if (value === "1") {
      const sortedFlightsDescending = flights
        .slice()
        .sort((a, b) => b.price - a.price);
      setFlights(sortedFlightsDescending);

      console.log(sortedFlightsDescending);
    }
    setPriceOrder(value);
  };

  useEffect(() => {
    console.log(flights);
    handlePriceOrder(priceOrder);
  }, [flights]);

  return (
    <>
      <Select placeholder="Fiyat">
        <option onChange={(e) => handlePriceOrder(e.target.value)} value="0">
          Artan Fiyat
        </option>
        <option onChange={(e) => handlePriceOrder(e.target.value)} value="1">
          Azalan Fiyat
        </option>
      </Select>

      {flights.map((flight) => {
        return (
          <Box
            key={flight.id}
            mb={"20px"}
            bg={"white"}
            h={"10vh"}
            borderRadius={20}
            display={"flex"}
            alignItems={"center"}
          >
            <Box ml={"25px"}>
              <FaPlaneDeparture color="black" size={"50px"} />
            </Box>

            <Box ml={"25px"}>
              <Text color={"black"}>06.00</Text>
              <Text color={"black"}>{flight.fromCity}</Text>
            </Box>

            <Box ml={"25px"}>
              <VStack justifyContent={"center"} alignItems={"center"}>
                <Text
                  color={"black"}
                >{`Uçuş Süresi ${flight.duration}dk`}</Text>
                <Divider
                  //   ml={"50px"}
                  borderColor={"blue"}
                  borderWidth={"3px"}
                  w={"20vw"}
                />
              </VStack>
              <Flex justifyContent={"space-between"}>
                <Text color={"black"}>IST</Text>
                <Text color={"black"}>ESB</Text>
              </Flex>
            </Box>

            <Box ml={"25px"}>
              <Text color={"black"}>08.00</Text>
              <Text color={"black"}>Ankara</Text>
            </Box>

            <Box ml={"25px"}>
              <Text color={"black"}>31.01.2024</Text>
            </Box>
            <Box ml={"25px"}>
              <Text color={"black"}>{flight.price + " tl"}</Text>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ListPage;
