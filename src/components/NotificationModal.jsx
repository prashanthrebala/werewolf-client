import { Box, Modal, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minHeight: "14rem",
	maxHeight: "20rem",
	overflowY: "hidden",
	width: "20rem",
	backgroundColor: "#125332",
	color: "#bfbfbf",
	borderRadius: "1em",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	p: 4,
};

export const NotificationModal = ({
	shouldDisplay,
	setShouldDisplay,
	content,
}) => {
	return (
		<Modal
			sx={{ backgroundColor: `rgba(0, 0, 0, 0.9)` }}
			open={shouldDisplay}
			onClose={() => setShouldDisplay(false)}
		>
			<Box sx={style}>
				<Typography fontSize={"1.1em"}>{content}</Typography>
			</Box>
		</Modal>
	);
};
