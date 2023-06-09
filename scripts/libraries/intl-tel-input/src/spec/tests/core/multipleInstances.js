"use strict";

describe("multiple instances: init plugin (with nationalMode=false) to test multiple instances", function() {

  var input2,
    iti2,
    afghanistanCountryCode = "af",
    albaniaCountryCode = "al",
    chinaCountryCode = "cn",
    chinaDialCode = "+86",
    koreaCountryCode = 'kr',
    russiaCountryCode = 'ru';

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    input2 = $("<input>").wrap("div");

    iti = window.intlTelInput(input[0], {
      onlyCountries: [afghanistanCountryCode, chinaCountryCode],
      nationalMode: false,
    });
    iti2 = window.intlTelInput(input2[0], {
      onlyCountries: [albaniaCountryCode, chinaCountryCode, koreaCountryCode, russiaCountryCode],
      nationalMode: false,
    });
    $("body").append(getParentElement(input)).append(getParentElement(input2));
  });

  afterEach(function() {
    intlTeardown();
    iti2.destroy();
    input2.remove();
    input2 = iti2 = null;
  });

  it("instances have different country lists", function() {
    expect(getListLength()).toEqual(2);
    expect(getListLength(input2)).toEqual(4);
  });

  it("instances have different default countries selected", function() {
    expect(getSelectedFlagElement()).toHaveClass(`iti__${afghanistanCountryCode}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaCountryCode}`);
  });

  it("selecting an item from the first input dropdown only updates the flag on that input", function() {
    selectFlag(chinaCountryCode);
    expect(getSelectedFlagElement()).toHaveClass(`iti__${chinaCountryCode}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaCountryCode}`);
  });

  it("updating the number on the first input only updates the flag on that input", function() {
    input.val(chinaDialCode + " 123456");
    triggerKeyOnInput(" ");
    expect(getSelectedFlagElement()).toHaveClass(`iti__${chinaCountryCode}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaCountryCode}`);
  });



  describe("clicking open dropdown on the first input", function() {

    beforeEach(function() {
      getSelectedFlagContainer()[0].click();
    });

    it("only opens the dropdown on that input", function() {
      expect(getListElement()).toBeVisible();
      expect(getListElement(input2)).not.toBeVisible();
    });

    it("then clicking open dropdown on the second will close the first and open the second", function() {
      getSelectedFlagContainer(input2)[0].click();
      expect(getListElement()).not.toBeVisible();
      expect(getListElement(input2)).toBeVisible();
    });

  });

});
