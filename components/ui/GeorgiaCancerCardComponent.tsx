"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a theme instance with Georgia Cancer Info colors
const georgiaCancerTheme = createTheme({
  palette: {
    primary: {
      main: "#0067b1", // Georgia Cancer Info primary blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f7941d", // Georgia Cancer Info accent orange
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5", // Light gray background
    },
    text: {
      primary: "#333333", // Dark text for headings
      secondary: "#555555", // Medium gray for body text
    },
  },
  typography: {
    fontFamily: "Roboto, 'Helvetica Neue', Arial, sans-serif",
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontSize: "0.875rem",
      lineHeight: 1.25,
      letterSpacing: "0.00938em",
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "12px 4px 12px 16px",
          height: 72,
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "10px 24px",
          height: 40,
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          backgroundColor: "#0067b1",
          "&:hover": {
            backgroundColor: "#005698",
          },
        },
        containedSecondary: {
          backgroundColor: "#f7941d",
          "&:hover": {
            backgroundColor: "#e58718",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0067b1",
          color: "#ffffff",
        },
      },
    },
  },
});

interface GeorgiaCancerCardComponentProps {
  headerTitle?: string;
  headerSubtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  contentTitle?: string;
  contentSubtitle?: string;
  contentDescription?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onMoreOptionsClick?: () => void;
}

const GeorgiaCancerCardComponent: React.FC<GeorgiaCancerCardComponentProps> = ({
  headerTitle = "Research Initiatives",
  headerSubtitle = "Georgia CORE",
  imageSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/ef582ec6dc77bd0c7a34d7459c4c6bb1fc585fd8",
  imageAlt = "Cancer research image",
  contentTitle = "Cancer Research",
  contentSubtitle = "Innovative Approaches",
  contentDescription = "Supporting groundbreaking cancer research initiatives across Georgia to improve patient outcomes.",
  buttonText = "Learn More",
  onButtonClick = () => {},
  onMoreOptionsClick = () => {},
}) => {
  return (
    <ThemeProvider theme={georgiaCancerTheme}>
      <Card sx={{ width: 360, height: 480, maxWidth: "100%" }}>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          action={
            <IconButton aria-label="more options" onClick={onMoreOptionsClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" component="h2">
              {headerTitle}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1" color="text.secondary">
              {headerSubtitle}
            </Typography>
          }
        />

        <CardMedia
          component="img"
          height="188"
          image={imageSrc}
          alt={imageAlt}
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "calc(480px - 72px - 188px)",
            padding: 2,
          }}
        >
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {contentTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {contentSubtitle}
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary">
            {contentDescription}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto" }}>
            <Button variant="contained" color="primary" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default GeorgiaCancerCardComponent;
