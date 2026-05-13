import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Button } from "../Buttons/Button";

export const VenueSuggestion = ({ venueDetails, btnText, onClick }) => {
  const openLocation = () => {
    if (venueDetails.location) {
      Linking.openURL(venueDetails.location);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image placeholder with event type badge */}
      <View style={styles.imageWrapper}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{venueDetails.bookings || 0}</Text>
        </View>
      </View>

      {/* Text block */}
      <View style={styles.textBlock}>
        <TouchableOpacity onPress={openLocation} style={styles.addressRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.address} numberOfLines={1}>
            {venueDetails.location || "None"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.venueName}>{venueDetails.title}</Text>
        <Text style={styles.venueDesc} numberOfLines={3}>
          {venueDetails.description}
        </Text>
      </View>

      {/* Action button */}
      <Button
        disabled={!venueDetails.available}
        onClick={() => onClick(venueDetails)}
      >
        {btnText || "Book now"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 160,
    marginBottom: 14,
  },
  imagePlaceholder: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    backgroundColor: "#E8F5E9",
    borderRadius: 4,
  },
  badge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  textBlock: {
    gap: 10,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationIcon: {
    fontSize: 14,
  },
  address: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "400",
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  venueDesc: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
