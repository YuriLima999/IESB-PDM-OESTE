import { ScrollView, StyleSheet, Text } from "react-native-web";

function metasList(props) {
    return(
    <ScrollView style={[styles.metaContainer, { width: 250 }]}>
        {props.array.map((meta, index) => <Text key={index} 
            style={styles.item}>{meta}</Text>)}
      </ScrollView>
    )
}
export default metasList;

const styles = StyleSheet.create({
    item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#a7abe2",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  }
})