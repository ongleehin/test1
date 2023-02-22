/* eslint-disable react/jsx-key */
import Box from "@mui/material/Box";
import React, { useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import useRefresh from "../../../hooks/useRefresh";
// import useRefresh from "@/hooks/useRefresh";

interface UrlEntity {
  url: string;
  shortUrl: string;
}
const backendHost = import.meta.env.VITE_BACKEND_HOST_IP;
const backendPort = import.meta.env.VITE_BACKEND_PORT;
console.log("backendHost", backendHost);
console.log("backendPort", backendPort);
const getShortUrlsAxios = async (): Promise<UrlEntity[]> => {
  const { data } = await axios.get(
    `http://${backendHost}:${backendPort}/api/url`
  );
  return data;
};

const openLinkInNewTab = (url: string) => () => {
  window.open(url, "_blank", "noopener,noreferrer");
};
export default function TabPanelManageURL() {
  // const { mutate } = useMutation({
  //   mutationFn: axiosDelete,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["shortUrl"] });
  //   },
  // });

  const {
    isLoading,
    isFetching,
    refetch,
    data: urls,
    error,
  }: UseQueryResult<UrlEntity[], Error> = useQuery<UrlEntity[], Error>({
    queryKey: ["shortUrl"],
    queryFn: getShortUrlsAxios,
    cacheTime: 0, // disable cache
    staleTime: 0, // disable staletime
  });
  // useEffect(() => {
  //   console.count("load");
  //   console.log(isLoading, isFetching);
  // });
  const deleteShortUrl = useCallback(
    (url: string) => () => {
      axios
        .delete(`http://${backendHost}:${backendPort}/api/url/${url}`)
        .finally(() => {
          setTimeout(refetch, 100);
        });
    },
    []
  );
  const renderShortUrls = useCallback(
    (urlEntities: UrlEntity[] | undefined) => {
      return (
        urlEntities &&
        React.Children.toArray(
          urlEntities.map((entity) => (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      openLinkInNewTab(`http://${entity.url}`);
                    }}
                  >
                    {entity.url}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      openLinkInNewTab(`http://${entity.shortUrl}`);
                    }}
                  >
                    {entity.shortUrl}
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={deleteShortUrl(entity.url)}>
                    {/* <IconButton onClick={deleteShortUrlsAxios(entity.url)}> */}
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                {/* <TableCell>
                  <Link to="/urlEdit">
                    <EditIcon />
                  </Link>
                </TableCell> */}
              </TableRow>
            </TableBody>
          ))
        )
      );
    },
    []
  );

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: ${error.message}`</div>;

  return (
    <Box sx={{ height: "40vh" }}>
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>Shorten Url</TableCell>
              <TableCell />
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {React.Children.toArray([<TableCell />, <TableCell />])}
            </TableRow>
          </TableBody>
          {renderShortUrls(urls)}
        </Table>
      </TableContainer>
    </Box>
  );
}
