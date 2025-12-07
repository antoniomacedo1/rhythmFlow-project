import { StyleSheet } from 'react-native';

export const COLORS = {
  greenLight: '#3CC77A',
  greenDark: '#2EA865',
  textDark: '#1a1a1a',
  gray: '#666',
  bg: '#F5F8F6',
};

export const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    backgroundColor: COLORS.greenLight,
    paddingTop: 34,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 28,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  container: {
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#cfcfcf',
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.greenLight,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  trackImage: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  iconButton: {
    padding: 14,
    backgroundColor: COLORS.greenLight,
    color: 'white',
    borderRadius: 50,
    minWidth: 60,
    alignItems: 'center',
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 13,
    color: COLORS.gray,
  }
});
