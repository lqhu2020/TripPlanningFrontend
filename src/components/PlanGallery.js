import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { Button, Modal } from "antd";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
    Chip,
} from "@material-ui/core";

import useStyle from "../styles/PlaceListStyle";

function PlanGallery(props) {
    const [plans, setPlans] = useState(props.plans);
    const [images, setImages] = useState(props.images);
    const classes = useStyle();

    const onDeletePlan = (planId) => {
        if (window.confirm(`Are you sure you want to delete this image?`)) {
            const newImageArr = images.filter((img) => img.planId !== planId);
            console.log("delete image ", newImageArr);
            setImages(newImageArr);
            console.log(images);
        }
        // console.log('delete plan', planId);
        // const newImageArr = images.filter((img) => img.planId !== planId);
        // console.log("delete image ", newImageArr);
        // setImages(newImageArr);
        // alert(planId);
    }

    const onShowPlanDetails = () => {
        alert("Show Plan Details!");
    }

    useEffect(() => {
        setImages(props.images);
    }, [props.images]);

    console.log("enter gallery", images);
    return (
        <Grid container spacing={3} className={classes.list}>
            {images.map((image, index) => (
                <Grid item key={index} xs={12}>
                    <Card elevation={6}>
                        <CardMedia
                            style={{ height: 300, width: 300 }}
                            image={ image.src }
                            title={ image.caption }
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {image.caption}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={onShowPlanDetails}> Show Details </Button>
                            <Button onClick={() => onDeletePlan(image.planId)}> Delete the Plan </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default PlanGallery