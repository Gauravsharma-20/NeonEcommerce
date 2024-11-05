const baseColors = {
  colorNoonYellow: '#feee00',
  colorNoonYellowMuted: '#c7ba00',
  colorNoonBlue: '#3866df',
  colorNoonBlueLight: '#edf2ff',
  colorNoonBlack: '#404553',
  colorWhite: '#fff',
  colorBlack: '#000',
  colorGrey1: '#7e859b',
  colorGrey2: '#9ba0b1',
  colorGrey3: '#dadce3',
  colorGrey4: '#f3f4f8',
  colorGrey5: '#eceef4',
  colorGrey6: '#8692a5',
  colorGrey7: '#f7f7f7',
  colorGreySeparator: '#edeef2',
  colorSystemGreen: '#38ae04',
  colorSystemGreenTint: '#dff1da',
  colorSystemGreenTintLight: '#38ae040d',
  colorSystemOrange: '#f3ac30',
  colorSystemOrangeTint: '#fff8ec',
  colorOpaqueLoader: 'rgba(255, 255, 255, 0.8)',  
  colorSystemRed: '#fa0000',
  colorSystemRedAlt: '#ea2b2b',
  colorSystemRedTint: '#fdecec',
  colorSystemBlueTint: '#eff3fd',
  colorScrim: 'rgba(0,0,0,.4)',
  colorControlDisabled: '#cbcfd7',
  colorControlDisabledBg: '#f0f1f4',
  colorVipBlack: '#1c1c1b',
  colorVipDisable: '#eceef4',
  colorBorderBlueLight: '#f0f2f7',
  colorSupermallBg: '#2122b8',
  colorEnbdBlack: '#1b1a1c',
  colorEnbdGreen: '#c2f770',
};

const colors = {
  primaryBackgroundColor: baseColors.colorBorderBlueLight,
  secondaryBackgroundColor: baseColors.colorNoonBlack,
  productTitle: baseColors.colorVipBlack,
  price: baseColors.colorNoonBlack,
  message: baseColors.colorNoonBlack,
  tagColor: baseColors.colorNoonBlue,
  tagTextColor: baseColors.colorEnbdGreen,
  productListBackground: baseColors.colorGreySeparator,
  confirmationMessage: baseColors.colorSystemGreen,
  searchBarBackgroundColor: baseColors.colorWhite,
  searchBarBorderColor: baseColors.colorGrey2,
  cartItemBackgroundColor: baseColors.colorGrey3,
  cartItemShadow: baseColors.colorNoonBlack,
  productCardBackGround: baseColors.colorGrey4,
  buttonColor: baseColors.colorSystemOrange,
  secondaryButtonColor: baseColors.colorNoonBlue,
  placeholderBackgroundColor: baseColors.colorGrey2,
  confirmationScreenBackground: baseColors.colorWhite,
  activeDotColor: baseColors.colorControlDisabled,
  inactiveDotColor: baseColors.colorGrey5,
  loaderColor: baseColors.colorOpaqueLoader,
  whiteColor: baseColors.colorWhite,
  blackColor: baseColors.colorBlack
};

const commonStyles = {
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryText,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    color: colors.message,
    fontSize: 18,
    marginTop: 20,
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: colors.productListBackground,
  },
  primaryButton: {
    backgroundColor: colors.buttonColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: colors.productTitle,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.secondaryButtonColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    colors: colors.productTitle,
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export { colors, commonStyles };