import { describe, expect, it } from "vitest";

import { dayjs } from "../../src/node/utils/dayjs/index.js";

const format = "dddd D, MMMM";
const NOT_SUPPORTED_LOCALE_STRING = "not_supported_locale_string";

describe("dayjs()", () => {
  it("set locale for one instance only", () => {
    dayjs.locale("en");

    expect(dayjs("2018-4-28").format(format)).toBe("Saturday 28, April");

    expect(dayjs("2018-4-28").locale("es").format(format)).toBe(
      "sábado 28, abril"
    );

    expect(dayjs("2018-4-28").format(format)).toBe("Saturday 28, April");
  });

  it("set global locale", () => {
    dayjs.locale("en");
    expect(dayjs("2018-4-28").format(format)).toBe("Saturday 28, April");
    dayjs.locale("es");
    expect(dayjs("2018-4-28").format(format)).toBe("sábado 28, abril");
    dayjs.locale("en");
    expect(dayjs("2018-4-28").format(format)).toBe("Saturday 28, April");
  });

  it("get instance locale name", () => {
    expect(dayjs().locale()).toBe("en");
    expect(dayjs().locale("es").locale()).toBe("es");
    dayjs.locale("es");
    expect(dayjs().locale()).toBe("es");
  });

  it("immutable instance locale", () => {
    dayjs.locale("en");
    const origin = dayjs("2018-4-28");

    expect(origin.format(format)).toBe("Saturday 28, April");
    expect(origin.locale("es").format(format)).toBe("sábado 28, abril");

    const changed = origin.locale("es");

    expect(changed.format(format)).toBe("sábado 28, abril");
    expect(origin.format(format)).toBe("Saturday 28, April");
  });

  it("User custom locale", () => {
    expect(
      dayjs("2018-4-28")
        .locale("xx", {
          weekdays: Array(7).fill("week"),
          months: Array(12).fill("month"),
        })
        .format(format)
    ).toBe("week 28, month");
  });

  describe("Instance locale inheritance", () => {
    const esDayjs = dayjs("2018-4-28").locale("es");

    it("Clone", () => {
      expect(esDayjs.clone().format(format)).toBe("sábado 28, abril");
      expect(dayjs(esDayjs).format(format)).toBe("sábado 28, abril");
    });

    it("StartOf EndOf", () => {
      expect(esDayjs.startOf("year").format(format)).toBe("lunes 1, enero");
      expect(esDayjs.endOf("day").format(format)).toBe("sábado 28, abril");
    });

    it("Set", () => {
      expect(esDayjs.set("year", 2017).format(format)).toBe(
        "viernes 28, abril"
      );
    });

    it("Add", () => {
      expect(esDayjs.add(1, "year").format(format)).toBe("domingo 28, abril");
      expect(esDayjs.add(1, "month").format(format)).toBe("lunes 28, mayo");
      expect(esDayjs.add(1, "minute").format(format)).toBe("sábado 28, abril");
    });

    it("dayjs.locale() returns locale name", () => {
      dayjs.locale("es");
      expect(dayjs.locale()).toBe("es");

      dayjs.locale("en");
      expect(dayjs.locale()).toBe("en");
    });
  });

  it("Not supported locale string fallback to previous one (instance)", () => {
    const D = dayjs();

    expect(D.locale()).toBe("en");

    const D2 = D.locale(NOT_SUPPORTED_LOCALE_STRING);

    expect(D2.locale()).toBe("en");
    expect(D2.format()).toBe(D.format());

    const D3 = D2.locale("es");

    expect(D3.locale()).toBe("es");

    const D4 = D3.locale(NOT_SUPPORTED_LOCALE_STRING);

    expect(D4.locale()).toBe("es");
  });

  it("Not supported locale string fallback to previous one (global)", () => {
    expect(dayjs().locale()).toBe("en");
    dayjs.locale(NOT_SUPPORTED_LOCALE_STRING);
    expect(dayjs().locale()).toBe("en");
    dayjs.locale("es");
    expect(dayjs().locale()).toBe("es");
    dayjs.locale(NOT_SUPPORTED_LOCALE_STRING);
    expect(dayjs().locale()).toBe("es");
  });

  it("Support locales", () => {
    expect(dayjs("2018-4-28").locale("de").format(format)).toBe(
      "Samstag 28, April"
    );
    expect(dayjs("2018-4-28").locale("de-at").format(format)).toBe(
      "Samstag 28, April"
    );
    expect(dayjs("2018-4-28").locale("en").format(format)).toBe(
      "Saturday 28, April"
    );
    expect(dayjs("2018-4-28").locale("es").format(format)).toBe(
      "sábado 28, abril"
    );
    expect(dayjs("2018-4-28").locale("fr").format(format)).toBe(
      "samedi 28, avril"
    );
    expect(dayjs("2018-4-28").locale("id").format(format)).toBe(
      "Sabtu 28, April"
    );
    expect(dayjs("2018-4-28").locale("ja").format(format)).toBe(
      "土曜日 28, 四月"
    );
    expect(dayjs("2018-4-28").locale("ko").format(format)).toBe(
      "토요일 28, 4월"
    );
    expect(dayjs("2018-4-28").locale("nl").format(format)).toBe(
      "zaterdag 28, april"
    );
    expect(dayjs("2018-4-28").locale("pl").format(format)).toBe(
      "sobota 28, kwiecień"
    );
    expect(dayjs("2018-4-28").locale("pt-br").format(format)).toBe(
      "sábado 28, abril"
    );
    expect(dayjs("2018-4-28").locale("ru").format(format)).toBe(
      "суббота 28, апрель"
    );
    expect(dayjs("2018-4-28").locale("sk").format(format)).toBe(
      "sobota 28, apríl"
    );
    expect(dayjs("2018-4-28").locale("tr").format(format)).toBe(
      "Cumartesi 28, Nisan"
    );
    expect(dayjs("2018-4-28").locale("uk").format(format)).toBe(
      "субота 28, квітень"
    );
    expect(dayjs("2018-4-28").locale("vi").format(format)).toBe(
      "thứ bảy 28, tháng 4"
    );

    expect(dayjs("2018-4-28").locale("zh-tw").format(format)).toBe(
      "星期六 28, 四月"
    );
    expect(dayjs("2018-4-28").locale("zh").format(format)).toBe(
      "星期六 28, 四月"
    );
  });
});
