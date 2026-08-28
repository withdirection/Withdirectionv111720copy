"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "./ui/utils";

// Event Types
const EVENT_TYPES = [
  "Workshop",
  "Community Event",
  "Conference",
  "Performance",
  "Educational",
  "Art Tour",
  "Other",
] as const;

// Format Options
const FORMAT_OPTIONS = ["In person", "Virtual", "Hybrid"] as const;

// Access Types
const ACCESS_TYPES = [
  "ASL + ENGLISH (CC)",
  "ASL Interpreted Event",
  "Deaf-Led",
  "English Captioning ONLY",
  "Interpreted Events",
  "Visual Performance",
  "Not Sure",
] as const;

// Cost Options
const COST_OPTIONS = ["Free", "Ticketed", "Sliding scale", "Donation-based"] as const;

// Relationship Options
const RELATIONSHIP_OPTIONS = [
  "Host",
  "Organizer",
  "Performer",
  "Attendee",
  "Other",
] as const;

// Type definitions
export interface EventSubmission {
  // Event Details
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string;
  endTime?: string;
  eventType: (typeof EVENT_TYPES)[number];
  format: (typeof FORMAT_OPTIONS)[number];
  accessType: (typeof ACCESS_TYPES)[number];
  location?: string;
  platform?: string;
  cost?: (typeof COST_OPTIONS)[number];
  registrationLink?: string;
  website?: string;
  hostOrganization: string;
  accessibilityFeatures?: string;

  // Submitter Info
  submitterName: string;
  submitterEmail: string;
  submitterPhone?: string;
  submitterOrganization?: string;
  relationshipToEvent: (typeof RELATIONSHIP_OPTIONS)[number];

  // Consent
  consentToPublish: boolean;
  includeContactInfo: boolean;
  addToMailingList: boolean;
}

interface SubmitEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (eventData: EventSubmission) => Promise<void>;
}

export function SubmitEventModal({
  open,
  onOpenChange,
  onSubmit,
}: SubmitEventModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<EventSubmission>({
    defaultValues: {
      eventTitle: "",
      eventDescription: "",
      eventDate: undefined,
      startTime: "",
      endTime: "",
      eventType: undefined,
      format: undefined,
      accessType: undefined,
      location: "",
      platform: "",
      cost: undefined,
      registrationLink: "",
      website: "",
      hostOrganization: "",
      accessibilityFeatures: "",
      submitterName: "",
      submitterEmail: "",
      submitterPhone: "",
      submitterOrganization: "",
      relationshipToEvent: undefined,
      consentToPublish: false,
      includeContactInfo: false,
      addToMailingList: false,
    },
  });

  const formatValue = form.watch("format");
  const showLocation = formatValue === "In person" || formatValue === "Hybrid";
  const showPlatform = formatValue === "Virtual" || formatValue === "Hybrid";

  const handleSubmit = async (data: EventSubmission) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset form and success state after animation completes
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 bg-white">
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-[#00A9E0]/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#00A9E0]" />
            </div>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl text-[#14213D]">
                Event Submitted Successfully
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                Thank you for submitting your event. Our team will review it and
                add it to the community calendar soon.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleClose}
              className="bg-[#00A9E0] hover:bg-[#303F9F] text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl text-[#14213D]">
                Submit an Event
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Share an accessible event with the community. Fields marked with
                * are required.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-[calc(90vh-120px)]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="p-6 pt-4 space-y-6"
                >
                  {/* Event Details Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#14213D] border-b border-[#E6E9EF] pb-2">
                      Event Details
                    </h3>

                    {/* Event Title */}
                    <FormField
                      control={form.control}
                      name="eventTitle"
                      rules={{ required: "Event title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Event Title *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter event title"
                              className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Event Description */}
                    <FormField
                      control={form.control}
                      name="eventDescription"
                      rules={{ required: "Event description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Event Description *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your event..."
                              className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0] min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Event Date */}
                      <FormField
                        control={form.control}
                        name="eventDate"
                        rules={{ required: "Event date is required" }}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-[#14213D]">
                              Event Date *
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "bg-[#F5F7FA] border-[#E6E9EF] hover:bg-[#E6E9EF] justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 bg-white"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date: Date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Start Time */}
                      <FormField
                        control={form.control}
                        name="startTime"
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Start Time *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* End Time */}
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              End Time
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Event Type and Format Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Type */}
                      <FormField
                        control={form.control}
                        name="eventType"
                        rules={{ required: "Event type is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Event Type *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#F5F7FA] border-[#E6E9EF]">
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                {EVENT_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Format */}
                      <FormField
                        control={form.control}
                        name="format"
                        rules={{ required: "Format is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Format *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#F5F7FA] border-[#E6E9EF]">
                                  <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                {FORMAT_OPTIONS.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Access Type */}
                    <FormField
                      control={form.control}
                      name="accessType"
                      rules={{ required: "Access type is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Access Type *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#F5F7FA] border-[#E6E9EF]">
                                <SelectValue placeholder="Select accessibility type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {ACCESS_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Conditional Location Field */}
                    {showLocation && (
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Event venue address"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Conditional Platform Field */}
                    {showPlatform && (
                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Platform
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Zoom link, Google Meet"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Cost and Links Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Cost */}
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">Cost</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#F5F7FA] border-[#E6E9EF]">
                                  <SelectValue placeholder="Select cost type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                {COST_OPTIONS.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Registration Link */}
                      <FormField
                        control={form.control}
                        name="registrationLink"
                        rules={{
                          pattern: {
                            value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,63}(\/\S*)?$/i,
                            message: "Please enter a valid URL",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Registration Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Website */}
                      <FormField
                        control={form.control}
                        name="website"
                        rules={{
                          pattern: {
                            value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,63}(\/\S*)?$/i,
                            message: "Please enter a valid URL",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Website
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Host Organization */}
                    <FormField
                      control={form.control}
                      name="hostOrganization"
                      rules={{ required: "Host organization is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Host Organization *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Organization hosting this event"
                              className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Accessibility Features */}
                    <FormField
                      control={form.control}
                      name="accessibilityFeatures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Accessibility Features
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any additional accommodations or accessibility features..."
                              className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0] min-h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            Include details about ASL interpreters, captioning,
                            wheelchair access, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submitter Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#14213D] border-b border-[#E6E9EF] pb-2">
                      Your Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Submitter Name */}
                      <FormField
                        control={form.control}
                        name="submitterName"
                        rules={{ required: "Your name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Your Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submitter Email */}
                      <FormField
                        control={form.control}
                        name="submitterEmail"
                        rules={{
                          required: "Your email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Your Email *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Submitter Phone */}
                      <FormField
                        control={form.control}
                        name="submitterPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Your Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Your phone number"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submitter Organization */}
                      <FormField
                        control={form.control}
                        name="submitterOrganization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#14213D]">
                              Your Organization
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your organization (if any)"
                                className="bg-[#F5F7FA] border-[#E6E9EF] focus-visible:border-[#00A9E0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Relationship to Event */}
                    <FormField
                      control={form.control}
                      name="relationshipToEvent"
                      rules={{ required: "Please select your relationship to this event" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#14213D]">
                            Your Relationship to Event *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#F5F7FA] border-[#E6E9EF]">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {RELATIONSHIP_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Consent Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#14213D] border-b border-[#E6E9EF] pb-2">
                      Consent
                    </h3>

                    {/* Consent to Publish */}
                    <FormField
                      control={form.control}
                      name="consentToPublish"
                      rules={{
                        validate: (value) =>
                          value === true ||
                          "You must consent to publish this event",
                      }}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#00A9E0] data-[state=checked]:border-[#00A9E0]"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[#14213D] cursor-pointer">
                              I consent to this event being published on the
                              WITHdirection community calendar *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Include Contact Info */}
                    <FormField
                      control={form.control}
                      name="includeContactInfo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#00A9E0] data-[state=checked]:border-[#00A9E0]"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[#14213D] cursor-pointer">
                              Include my contact info for questions
                            </FormLabel>
                            <FormDescription className="text-gray-500">
                              Your email will be visible to users who want to
                              ask questions about this event.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Add to Mailing List */}
                    <FormField
                      control={form.control}
                      name="addToMailingList"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#00A9E0] data-[state=checked]:border-[#00A9E0]"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[#14213D] cursor-pointer">
                              Add me to the mailing list
                            </FormLabel>
                            <FormDescription className="text-gray-500">
                              Receive updates about community events and
                              accessibility resources.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E9EF]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="border-[#E6E9EF] text-[#14213D] hover:bg-[#F5F7FA]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#00A9E0] hover:bg-[#303F9F] text-white min-w-32"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Event"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
