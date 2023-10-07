/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";

import { Event } from "@/backend/service/event/types";
import { PrimaryButton } from "@/components/Elements/Buttons";
import DatePickerField from "@/components/Elements/DatePickerField";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import {
  FormErrorMessage,
  FormSuccessMessage,
} from "@/components/Elements/General";
import TextField from "@/components/Elements/TextField";
import CircularLoader from "@/components/Loaders/CircularLoader";
import { color } from "@/utilities/color";
import { size } from "@/utilities/size";

import { EventSchema, EventSchemaType } from "./EventSchema";

export const EventSectionContainer = styled(FlexColumn.StartStart)({
  padding: "40px",
  minHeight: "calc(100vh - var(--header-height))",
  height: "100%",
});

export const EventTitle = styled.div({
  color: color.black,
  fontSize: size[19],
  fontWeight: 900,
  letterSpacing: "-0.1px",
});

const FormContainer = styled.form({
  width: "100%",
});

export const DialofTitle = styled.div({
  color: color.black,
  fontSize: size[19],
  fontWeight: 900,
  letterSpacing: "-0.1px",
  padding: "0 20px",
});

const FieldWrapper = styled(FlexColumn.StartStart)({});

interface EventFormProps {
  event: Event | null | undefined;
}

interface ControllerField {
  field: FieldValues;
}

const EventForm = ({ event }: EventFormProps): ReactElement => {
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    mode: "onChange",
  });

  const handleEvent = (): void => {
    if (event) {
      setValue("uid", event.uid);
      setValue("slug", event.slug);
      setValue("title", event.title);
      setValue("description", event.description);
      setValue("start_date", event.start_date);
      setValue("end_date", event.end_date);
      setValue("location.address", event.location.address);
      setValue("location.lat", event.location.lat);
      setValue("location.lng", event.location.lng);
      setValue("organizer", event.organizer);

      // Ticket Info
      setValue("ticket_info.price", event.ticket_info.price);
      setValue("ticket_info.availability", event.ticket_info.availability);
      setValue(
        "ticket_info.sale_start_date",
        event.ticket_info.sale_start_date
      );
      setValue("ticket_info.sale_end_date", event.ticket_info.sale_end_date);

      // Categories and Tags - Assuming they are arrays of strings
      setValue("categories", event.categories);
      setValue("tags", event.tags);

      // Images
      setValue("primary_image.url", event.primary_image.url);
      setValue("primary_image.alt", event.primary_image.alt);
    }
  };

  useEffect(() => {
    handleEvent();
  }, [event]);

  const onSubmit = async (): Promise<void> => {
    setSubmitSuccess("");
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    // delay for 2 seconds to show loading
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess("Event updated successfully");
    }, 2000);
    setIsSubmitting(false);
  };

  return (
    <EventSectionContainer gap={35} className="form-section">
      <EventTitle>{event ? "Edit Event" : "Add Event"}</EventTitle>
      <FormContainer
        onSubmit={(e): void => {
          e.preventDefault();
          setSubmitSuccess("");
          setSubmitError("");
          handleSubmit(onSubmit)();
        }}
        className="event-form"
      >
        <FlexColumn.StartStart gap={20}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }: FieldValues): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Event Title"
                  required
                />
                {errors.title?.message && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }: FieldValues): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Event Description"
                  required
                />
                {errors.description?.message && (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="location.address"
            control={control}
            defaultValue=""
            render={({ field }: FieldValues): ReactElement => (
              <FieldWrapper>
                <TextField
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label="Event Location"
                  required
                />
                {errors.location?.message && (
                  <FormErrorMessage>{errors.location.message}</FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="start_date"
            control={control}
            defaultValue={new Date().getTime()}
            render={({ field }: FieldValues): ReactElement => (
              <FieldWrapper>
                <DatePickerField
                  name={field.name}
                  onChange={(date): void => {
                    field.onChange(date.getTime());
                  }}
                  value={field.value}
                  label="Start Date"
                  required
                />
                {errors.start_date?.message && (
                  <FormErrorMessage>
                    {errors.start_date.message}
                  </FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />

          <Controller
            name="end_date"
            control={control}
            defaultValue={new Date().getTime()}
            render={({ field }: FieldValues): ReactElement => (
              <FieldWrapper>
                <DatePickerField
                  name={field.name}
                  onChange={(date): void => {
                    field.onChange(date.getTime());
                  }}
                  value={field.value}
                  label="End Date"
                  required
                />
                {errors.end_date?.message && (
                  <FormErrorMessage>{errors.end_date.message}</FormErrorMessage>
                )}
              </FieldWrapper>
            )}
          />
        </FlexColumn.StartStart>

        <FlexRow.EndCenter gap={20} style={{ marginTop: "20px" }}>
          <PrimaryButton type="submit" style={{ height: "50px" }}>
            {!isSubmitting && "Update"}
            {isSubmitting && (
              <FlexRow.CenterCenter gap={10}>
                <div>Updating</div>
                <CircularLoader color={color.white} />
              </FlexRow.CenterCenter>
            )}
          </PrimaryButton>
        </FlexRow.EndCenter>

        {(submitError || submitSuccess) && (
          <FlexColumn.CenterEnd style={{ marginTop: "10px" }}>
            {submitError && <FormErrorMessage>{submitError}</FormErrorMessage>}
            {submitSuccess && (
              <FormSuccessMessage style={{ color: color.gray650 }}>
                {submitSuccess}
              </FormSuccessMessage>
            )}
          </FlexColumn.CenterEnd>
        )}
      </FormContainer>
    </EventSectionContainer>
  );
};

export default EventForm;
