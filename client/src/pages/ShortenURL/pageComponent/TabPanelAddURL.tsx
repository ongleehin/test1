import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { Stack, Tooltip } from "@mui/material";

interface UrlEntity {
  url: string;
  shortUrl: string;
}
const backendHost = import.meta.env.VITE_BACKEND_HOST_IP;
const backendPort = import.meta.env.VITE_BACKEND_PORT;
export default function TabPanelAddURL() {
  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");

  const axiosPost = (inputUrl: string) => {
    const p = axios.post<UrlEntity>(
      `http://${backendHost}:${backendPort}/api/url`,
      {
        url: inputUrl,
      }
    );
    p.then((res) => {
      setShortUrl(res.data.shortUrl);
    });
    return p;
  };

  const { isLoading, mutate } = useMutation(axiosPost);
  const handleClick = useCallback(
    (inputUrl: string) => async () => {
      mutate(inputUrl);
    },
    []
  );

  return (
    <Box sx={{ height: "100%", padding: 5 }}>
      <Stack spacing={5}>
        <TextField
          error={false}
          id="outlined-error-helper-text"
          label="Enter a Url"
          onChange={(e) => {
            setUrl(e.target.value);
            setShortUrl("");
          }}
        />
        <Button
          disabled={url.length === 0}
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleClick(url)}
        >
          Shorten Url
        </Button>
        {isLoading ? "updating..." : ""}
        {/* {isError ? error.message : ""} */}
        {shortUrl && (
          <Tooltip placement="top-start" title={`http://${url}`}>
            <>
              {/* <TextField
                error={false}
                id="outlined-error-helper-text"
                label="Shortened Url"
                onChange={(e) => {
                  setUrl(e.target.value);
                  setShortUrl("");
                }}
              /> */}
              <Button
                disabled={shortUrl.length === 0}
                sx={{ textTransform: "none" }}
                onClick={() => {
                  window.open(`http://${shortUrl}`);
                }}
              >
                http://{shortUrl}
              </Button>
            </>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
}
