import { format } from "date-fns";
import { useCallback } from "react";
import ptBR from "date-fns/locale/pt-BR";

export const formatValores = (number: number) => {
  const numberFormated = new Intl.NumberFormat("en-US").format(number);

  return numberFormated;
};

export const formatNumber = (number: number) => {
  const numberFormated = new Intl.NumberFormat("Pt-br").format(number);

  return numberFormated;
};

export const formatDate = (date: Date) => {
  const dateFormated = format(new Date(date), "dd MMM yyy HH:mm:ss", {
    locale: ptBR,
  });

  return dateFormated;
};
