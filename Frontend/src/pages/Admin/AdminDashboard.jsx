import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBuilding,
  faCloudArrowUp,
  faCrown,
  faEye,
  faHandshakeAngle,
  faHouseSignal,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faRightFromBracket,
  faTrashCan,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { requestJson } from "../../Services/api";
import { clearAdminSession } from "../../Services/auth";
import { DEFAULT_SUBSCRIPTION_PLANS } from "../../constants/subscriptionPlans";
import * as S from "./AdminDashboard.styles";

let benefitDraftId = 0;
let subscriptionPlanDraftId = 0;

const createBenefit = () => ({
  clientId: `benefit-${(benefitDraftId += 1)}`,
  title: "",
  description: "",
  value: "",
  icon: "inspection",
});

const normalizePlanId = (value = "", fallback = "plan") => {
  const normalizedValue = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || fallback;
};

const createSubscriptionPlan = (plan = {}, index = 0) => ({
  clientId: `subscription-plan-${(subscriptionPlanDraftId += 1)}`,
  id:
    normalizePlanId(plan.id || plan.name, `plan-${index + 1}`) ||
    `plan-${index + 1}`,
  name: plan.name || "",
  price: plan.price || "",
  description: plan.description || "",
  benefitAmount: plan.benefitAmount || "",
  featuresInput: Array.isArray(plan.features)
    ? plan.features.join("\n")
    : String(plan.featuresInput || ""),
});

const createDefaultSubscriptionPlans = () =>
  DEFAULT_SUBSCRIPTION_PLANS.map((plan, index) =>
    createSubscriptionPlan(plan, index)
  );

const PROJECT_FIELD_PLACEHOLDERS = {
  name: "Prestige High Fields",
  builder: "Prestige Group",
  location: "Gachibowli, Hyderabad",
  area: "West Hyderabad",
  budget: "2.5 Cr",
  budgetValue: "25000000",
  bhk: "3, 4 BHK",
  size: "2000 - 3000 sq.ft",
  image: "https://example.com/project.jpg",
  description:
    "Premium residential project with spacious apartments, modern amenities, and strong connectivity.",
  possession: "Dec 2026",
  unitTypes: "2 BHK, 3 BHK, 4 BHK",
  priceRange: "1.2 Cr - 2.8 Cr",
  benefitsWorth: "8.5L",
  totalBenefitValue: "3L",
  amenitiesInput: "Clubhouse, Swimming Pool, Gym",
  locationAddress: "Financial District, Gachibowli, Hyderabad",
  googleMapsLink: "https://maps.google.com/?q=17.4401,78.3489",
};

const BENEFIT_FIELD_PLACEHOLDERS = {
  title: "Modular Kitchen",
  value: "3L or Included",
  description:
    "Designer modular kitchen with premium fittings and smart storage.",
};

const SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS = {
  name: "Basic",
  price: "Rs. 1,999",
  benefitAmount: "Rs 20K",
  description: "Ideal for first-time buyers who want benefit access.",
  featuresInput:
    "Benefit unlock for this project\nBuilder pricing support\nDocumentation guidance",
};

const DEFAULT_AMENITY_OPTIONS = [
  "Swimming Pool",
  "Club House",
  "Gym",
  "Tennis Court",
  "Kids Play Area",
  "Jogging Track",
  "Spa",
  "2 Car Parking",
  "24hr Security",
  "Full Power Backup",
];

const CURRENCY_UNIT_PATTERN = "(?:K|L|Cr|Crore|Crores|Lakh|Lakhs)";
const MONTH_PATTERN = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const simpleTextPattern = /^[A-Za-z][A-Za-z0-9\s,&.'()/-]*$/;
const addressPattern = /^[A-Za-z][A-Za-z\s,&.'()/-]*$/;
const amenityNamePattern = /^[A-Za-z0-9][A-Za-z0-9\s&/-]*$/;
const budgetPattern = new RegExp(
  `^(?:\\u20B9\\s?)?\\d+(?:\\.\\d+)?\\s?${CURRENCY_UNIT_PATTERN}$`,
  "i"
);
const priceRangePattern = new RegExp(
  `^(?:\\u20B9\\s?)?\\d+(?:\\.\\d+)?\\s?${CURRENCY_UNIT_PATTERN}(?:\\s*-\\s*(?:\\u20B9\\s?)?\\d+(?:\\.\\d+)?\\s?${CURRENCY_UNIT_PATTERN}|\\s+onwards)$`,
  "i"
);
const bhkPattern = /^\d+(?:\s*,\s*\d+)*\s*BHK$/i;
const unitTypesPattern = /^\d+\s*BHK(?:\s*,\s*\d+\s*BHK)*$/i;
const sizePattern = /^\d+\s*-\s*\d+\s*sq\.?\s*ft\.?$/i;
const possessionPattern = new RegExp(
  `^(Ready to Move|${MONTH_PATTERN}\\s+\\d{4})$`,
  "i"
);
const mapLinkPattern = /^https?:\/\/\S+$/i;
const imagePattern = /^(https?:\/\/\S+|data:image\/[a-zA-Z]+;base64,\S+)$/;

const normalizeAmenityName = (value = "") =>
  String(value)
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const hasValidAmenityList = (
  value,
  amenityOptions = DEFAULT_AMENITY_OPTIONS
) => {
  const items = String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    items.length >= 2 &&
    items.every((item) => {
      const normalizedItem = normalizeAmenityName(item);

      return (
        amenityNamePattern.test(item) &&
        amenityOptions.some((option) => option.toLowerCase() === normalizedItem.toLowerCase())
      );
    })
  );
};

const getAmenitiesErrorMessage = () =>
  "Select at least 2 amenities from the dropdown, or add a new amenity first.";

const getFieldErrorMessage = (field, example) =>
  `Enter correctly. Example: ${example}`;

const validateProjectField = (field, value) => {
  const trimmedValue =
    typeof value === "string" ? value.trim() : String(value || "").trim();

  switch (field) {
    case "name":
    case "builder":
    case "location":
    case "area":
      return simpleTextPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "locationAddress":
      return addressPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "budget":
    case "benefitsWorth":
    case "totalBenefitValue":
      return budgetPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "budgetValue":
      return /^\d+$/.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "bhk":
      return bhkPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "size":
      return sizePattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "image":
      return imagePattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "description":
      return trimmedValue.length >= 20
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "possession":
      return possessionPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "unitTypes":
      return unitTypesPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "priceRange":
      return priceRangePattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    case "amenitiesInput":
      return hasValidAmenityList(trimmedValue)
        ? ""
        : getAmenitiesErrorMessage();
    case "googleMapsLink":
      return mapLinkPattern.test(trimmedValue)
        ? ""
        : getFieldErrorMessage(field, PROJECT_FIELD_PLACEHOLDERS[field]);
    default:
      return "";
  }
};

const validateBenefitField = (field, value) => {
  const trimmedValue =
    typeof value === "string" ? value.trim() : String(value || "").trim();

  switch (field) {
    case "title":
      return trimmedValue.length >= 3
        ? ""
        : getFieldErrorMessage(field, BENEFIT_FIELD_PLACEHOLDERS[field]);
    case "value":
      return /^(Included|(?:\u20B9\s?)?\d+(?:\.\d+)?\s?(?:K|L|Cr|Crore|Crores|Lakh|Lakhs))$/i.test(
        trimmedValue
      )
        ? ""
        : getFieldErrorMessage(field, BENEFIT_FIELD_PLACEHOLDERS[field]);
    case "description":
      return trimmedValue.length >= 12
        ? ""
        : getFieldErrorMessage(field, BENEFIT_FIELD_PLACEHOLDERS[field]);
    default:
      return "";
  }
};

const validateSubscriptionPlanField = (field, value) => {
  const trimmedValue =
    typeof value === "string" ? value.trim() : String(value || "").trim();

  switch (field) {
    case "name":
      return trimmedValue.length >= 2
        ? ""
        : getFieldErrorMessage(field, SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS[field]);
    case "price":
    case "benefitAmount":
      return trimmedValue
        ? ""
        : getFieldErrorMessage(field, SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS[field]);
    case "description":
      return trimmedValue.length >= 10
        ? ""
        : getFieldErrorMessage(field, SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS[field]);
    case "featuresInput":
      return trimmedValue
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean).length >= 1
        ? ""
        : "Enter at least one feature on a separate line.";
    default:
      return "";
  }
};

const validateNewAmenityName = (
  value,
  amenityOptions = DEFAULT_AMENITY_OPTIONS
) => {
  const normalizedValue = normalizeAmenityName(value);

  if (!normalizedValue) {
    return "";
  }

  if (!amenityNamePattern.test(normalizedValue)) {
    return "Enter a valid amenity name.";
  }

  if (
    amenityOptions.some(
      (option) => option.toLowerCase() === normalizedValue.toLowerCase()
    )
  ) {
    return "This amenity already exists.";
  }

  return "";
};

const stripCurrencyInputValue = (value = "") =>
  String(value)
    .replace(/\u20B9/g, "")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s+/g, " ")
    .trim();

const emptyProject = () => ({
  id: "",
  name: "",
  location: "",
  budget: "",
  budgetValue: "",
  status: "Under Construction",
  area: "",
  bhk: "",
  size: "",
  image: "",
  featured: false,
  amenitiesInput: "",
  builder: "",
  description: "",
  possession: "",
  priceRange: "",
  unitTypes: "",
  benefits: [createBenefit(), createBenefit()],
  totalBenefitValue: "",
  benefitsWorth: "",
  locationAddress: "",
  googleMapsLink: "https://maps.google.com",
});

const mapProject = (project) => ({
  id: String(project.id ?? project._id ?? ""),
  name: project.name || "",
  location: project.location || "",
  budget: stripCurrencyInputValue(project.budget),
  budgetValue: String(project.budgetValue || ""),
  status: project.status || "Under Construction",
  area: project.area || "",
  bhk: project.bhk || "",
  size: project.size || "",
  image: project.image || "",
  featured: Boolean(project.featured),
  amenitiesInput: Array.isArray(project.amenities)
    ? project.amenities.join(", ")
    : "",
  builder: project.builder || "",
  description: project.description || "",
  possession: project.possession || "",
  priceRange: stripCurrencyInputValue(project.priceRange),
  unitTypes: project.unitTypes || "",
  benefits:
    project.benefits?.length > 0
      ? project.benefits.map((benefit, index) => ({
          clientId: `benefit-${(benefitDraftId += 1)}`,
          title: benefit.title || "",
          description: benefit.description || "",
          value: stripCurrencyInputValue(benefit.value),
          icon: benefit.icon || "inspection",
        }))
      : [createBenefit(), createBenefit()],
  totalBenefitValue: stripCurrencyInputValue(project.totalBenefitValue),
  benefitsWorth: stripCurrencyInputValue(project.benefitsWorth),
  locationAddress: project.locationAddress || "",
  googleMapsLink: project.googleMapsLink || "https://maps.google.com",
});

const buildProjectPayload = (form) => ({
  name: form.name.trim(),
  location: form.location.trim(),
  budget: form.budget.trim(),
  budgetValue: Number(form.budgetValue),
  status: form.status,
  area: form.area.trim(),
  bhk: form.bhk.trim(),
  size: form.size.trim(),
  image: form.image.trim(),
  featured: Boolean(form.featured),
  amenities: form.amenitiesInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  builder: form.builder.trim(),
  description: form.description.trim(),
  possession: form.possession.trim(),
  priceRange: form.priceRange.trim(),
  unitTypes: form.unitTypes.trim(),
  benefits: form.benefits
    .filter((benefit) => benefit.title.trim())
    .map((benefit) => ({
      title: benefit.title.trim(),
      description: benefit.description.trim(),
      value: benefit.value.trim(),
      icon: benefit.icon.trim() || "inspection",
    })),
  totalBenefitValue: form.totalBenefitValue.trim(),
  benefitsWorth: form.benefitsWorth.trim(),
  locationAddress: form.locationAddress.trim(),
  googleMapsLink: form.googleMapsLink.trim(),
});

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "Just now";

const toneForInvestor = (status) =>
  ({ qualified: "success", closed: "danger", contacted: "warning" })[status] ||
  "info";
const toneForRequest = (status) =>
  ({ completed: "success", scheduled: "warning", closed: "danger" })[status] ||
  "info";
const toneForSubscriberStatus = (status) =>
  ({ subscribed: "success", notUsed: "warning", expired: "danger" })[status] ||
  "info";
const formatStatusLabel = (status) =>
  status
    ? status
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (value) => value.toUpperCase())
    : "New";
const getSubscriberStatus = (request) => {
  if (request?.subscriberStatus) {
    return request.subscriberStatus;
  }

  if (request?.requestType !== "benefitClaim") {
    return "";
  }

  return ["completed", "closed"].includes(request.status)
    ? "expired"
    : "notUsed";
};
const getRequestTypeLabel = (requestType) =>
  requestType === "siteVisit" ? "Site Visit" : "Claim Benefits";
const getRequestCompletionLabel = (requestType) =>
  requestType === "siteVisit" ? "Schedule" : "Complete";

const AdminDashboard = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("projects");
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState(
    createDefaultSubscriptionPlans()
  );
  const [projectSearch, setProjectSearch] = useState("");
  const [projectForm, setProjectForm] = useState(emptyProject());
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingMembershipPlans, setIsSavingMembershipPlans] = useState(false);
  const [selectedInvestorId, setSelectedInvestorId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false);
  const [isSavingSubscriber, setIsSavingSubscriber] = useState(false);
  const [subscriberForm, setSubscriberForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectId: "",
    planId: "",
  });
  const [message, setMessage] = useState(null);
  const [amenityOptions, setAmenityOptions] = useState(DEFAULT_AMENITY_OPTIONS);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [isSavingAmenity, setIsSavingAmenity] = useState(false);
  const [projectFieldTouched, setProjectFieldTouched] = useState({});
  const [benefitFieldTouched, setBenefitFieldTouched] = useState({});
  const [subscriptionPlanFieldTouched, setSubscriptionPlanFieldTouched] =
    useState({});
  const [hasSubmittedProjectForm, setHasSubmittedProjectForm] = useState(false);
  const [hasSubmittedMembershipPlans, setHasSubmittedMembershipPlans] =
    useState(false);
  const [isAmenityDropdownOpen, setIsAmenityDropdownOpen] = useState(false);
  const projectFormRef = useRef(null);
  const amenityDropdownRef = useRef(null);

  const loadDashboardData = async ({
    showLoader = true,
    successMessage = "",
  } = {}) => {
    if (showLoader) {
      setIsLoading(true);
    }

    setIsRefreshing(true);

    try {
      const [
        summaryResponse,
        amenityOptionsResponse,
        projectsResponse,
        investorsResponse,
        requestsResponse,
        membershipPlansResponse,
      ] = await Promise.all([
        requestJson("/dashboard/summary"),
        requestJson("/projects/amenities"),
        requestJson("/projects"),
        requestJson("/investors"),
        requestJson("/requests"),
        requestJson("/membership-plans"),
      ]);
      const nextAmenityOptions =
        amenityOptionsResponse.data || DEFAULT_AMENITY_OPTIONS;
      const nextProjects = projectsResponse.data || [];
      const nextInvestors = investorsResponse.data || [];
      const nextRequests = requestsResponse.data || [];
      const nextMembershipPlans =
        membershipPlansResponse.data?.length > 0
          ? membershipPlansResponse.data.map((plan, index) =>
              createSubscriptionPlan(plan, index)
            )
          : createDefaultSubscriptionPlans();

      setStats(summaryResponse.data);
      setAmenityOptions(nextAmenityOptions);
      setProjects(nextProjects);
      setInvestors(nextInvestors);
      setRequests(nextRequests);
      setMembershipPlans(nextMembershipPlans);
      setSelectedInvestorId((current) =>
        nextInvestors.some((investor) => investor._id === current)
          ? current
          : null
      );
      setSelectedRequestId((current) =>
        nextRequests.some((request) => request._id === current) ? current : null
      );
      setMessage(
        successMessage ? { type: "success", text: successMessage } : null
      );
      return {
        amenityOptions: nextAmenityOptions,
        projects: nextProjects,
        investors: nextInvestors,
        requests: nextRequests,
        membershipPlans: nextMembershipPlans,
      };
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      return null;
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }

      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!amenityDropdownRef.current?.contains(event.target)) {
        setIsAmenityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const query = projectSearch.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) =>
      [project.name, project.builder, project.location, project.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [projectSearch, projects]);

  const siteVisitRequests = useMemo(
    () => requests.filter((request) => request.requestType === "siteVisit"),
    [requests]
  );
  const claimBenefitRequests = useMemo(
    () => requests.filter((request) => request.requestType === "benefitClaim"),
    [requests]
  );
  const selectedInvestor = useMemo(
    () =>
      investors.find((investor) => investor._id === selectedInvestorId) || null,
    [investors, selectedInvestorId]
  );
  const selectedRequest = useMemo(
    () => requests.find((request) => request._id === selectedRequestId) || null,
    [requests, selectedRequestId]
  );
  const selectedRequestProject = useMemo(() => {
    if (!selectedRequest) {
      return null;
    }

    return (
      projects.find(
        (project) =>
          Number(project.id) === Number(selectedRequest.projectId) ||
          project._id === selectedRequest.projectId ||
          project.name === selectedRequest.projectName
      ) || null
    );
  }, [projects, selectedRequest]);
  const getProjectForRequest = (request) =>
    projects.find(
      (project) =>
        Number(project.id) === Number(request.projectId) ||
        project._id === request.projectId ||
        project.name === request.projectName
    ) || null;

  const totals = stats?.totals || {};
  const recentItems =
    activeTab === "investors"
      ? stats?.recentInvestors || []
      : activeTab === "membershipPlans"
        ? []
      : stats?.recentRequests || [];

  const projectFieldErrors = useMemo(
    () => ({
      name: validateProjectField("name", projectForm.name),
      builder: validateProjectField("builder", projectForm.builder),
      location: validateProjectField("location", projectForm.location),
      area: validateProjectField("area", projectForm.area),
      budget: validateProjectField("budget", projectForm.budget),
      budgetValue: validateProjectField("budgetValue", projectForm.budgetValue),
      bhk: validateProjectField("bhk", projectForm.bhk),
      size: validateProjectField("size", projectForm.size),
      image: validateProjectField("image", projectForm.image),
      description: validateProjectField("description", projectForm.description),
      possession: validateProjectField("possession", projectForm.possession),
      unitTypes: validateProjectField("unitTypes", projectForm.unitTypes),
      priceRange: validateProjectField("priceRange", projectForm.priceRange),
      benefitsWorth: validateProjectField(
        "benefitsWorth",
        projectForm.benefitsWorth
      ),
      totalBenefitValue: validateProjectField(
        "totalBenefitValue",
        projectForm.totalBenefitValue
      ),
      amenitiesInput: hasValidAmenityList(
        projectForm.amenitiesInput,
        amenityOptions
      )
        ? ""
        : getAmenitiesErrorMessage(),
      locationAddress: validateProjectField(
        "locationAddress",
        projectForm.locationAddress
      ),
      googleMapsLink: validateProjectField(
        "googleMapsLink",
        projectForm.googleMapsLink
      ),
    }),
    [amenityOptions, projectForm]
  );

  const benefitFieldErrors = useMemo(
    () =>
      projectForm.benefits.reduce((accumulator, benefit, index) => {
        accumulator[`${index}-title`] = validateBenefitField(
          "title",
          benefit.title
        );
        accumulator[`${index}-value`] = validateBenefitField(
          "value",
          benefit.value
        );
        accumulator[`${index}-description`] = validateBenefitField(
          "description",
          benefit.description
        );
        return accumulator;
      }, {}),
    [projectForm.benefits]
  );

  const subscriptionPlanFieldErrors = useMemo(
    () =>
      membershipPlans.reduce((accumulator, plan, index) => {
        accumulator[`${index}-name`] = validateSubscriptionPlanField(
          "name",
          plan.name
        );
        accumulator[`${index}-price`] = validateSubscriptionPlanField(
          "price",
          plan.price
        );
        accumulator[`${index}-benefitAmount`] = validateSubscriptionPlanField(
          "benefitAmount",
          plan.benefitAmount
        );
        accumulator[`${index}-description`] = validateSubscriptionPlanField(
          "description",
          plan.description
        );
        accumulator[`${index}-featuresInput`] = validateSubscriptionPlanField(
          "featuresInput",
          plan.featuresInput
        );
        return accumulator;
      }, {}),
    [membershipPlans]
  );

  const setProjectField = (field, value) =>
    setProjectForm((current) => ({ ...current, [field]: value }));
  const toggleAmenity = (amenity) => {
    setProjectForm((current) => {
      const selectedAmenities = current.amenitiesInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const nextAmenities = selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((item) => item !== amenity)
        : [...selectedAmenities, amenity];

      return {
        ...current,
        amenitiesInput: nextAmenities.join(", "),
      };
    });
    markProjectFieldTouched("amenitiesInput");
  };
  const markProjectFieldTouched = (field) =>
    setProjectFieldTouched((current) => ({ ...current, [field]: true }));
  const markBenefitFieldTouched = (index, field) =>
    setBenefitFieldTouched((current) => ({
      ...current,
      [`${index}-${field}`]: true,
    }));
  const markSubscriptionPlanFieldTouched = (index, field) =>
    setSubscriptionPlanFieldTouched((current) => ({
      ...current,
      [`${index}-${field}`]: true,
    }));
  const showProjectFieldError = (field) =>
    Boolean(projectFieldErrors[field]) &&
    (hasSubmittedProjectForm || projectFieldTouched[field]);
  const showBenefitFieldError = (index, field) =>
    Boolean(benefitFieldErrors[`${index}-${field}`]) &&
    (hasSubmittedProjectForm || benefitFieldTouched[`${index}-${field}`]);
  const showSubscriptionPlanFieldError = (index, field) =>
    Boolean(subscriptionPlanFieldErrors[`${index}-${field}`]) &&
    (hasSubmittedMembershipPlans ||
      subscriptionPlanFieldTouched[`${index}-${field}`]);
  const newAmenityError = useMemo(
    () => validateNewAmenityName(newAmenityName, amenityOptions),
    [amenityOptions, newAmenityName]
  );
  const selectedAmenities = useMemo(
    () =>
      projectForm.amenitiesInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [projectForm.amenitiesInput]
  );
  const handleAddAmenity = async () => {
    const normalizedAmenity = normalizeAmenityName(newAmenityName);

    if (!normalizedAmenity || newAmenityError) {
      return;
    }

    setIsSavingAmenity(true);
    try {
      const response = await requestJson("/projects/amenities", {
        method: "POST",
        body: JSON.stringify({ name: normalizedAmenity }),
      });

      const savedAmenity = response.data?.name || normalizedAmenity;
      setAmenityOptions((current) =>
        [...new Set([...current, savedAmenity])].sort((left, right) =>
          left.localeCompare(right)
        )
      );
      setNewAmenityName("");

      setProjectForm((current) => {
        const selected = current.amenitiesInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        if (selected.includes(savedAmenity)) {
          return current;
        }

        return {
          ...current,
          amenitiesInput: [...selected, savedAmenity].join(", "),
        };
      });
      markProjectFieldTouched("amenitiesInput");
      setMessage({
        type: "success",
        text: "New amenity added to the dropdown.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSavingAmenity(false);
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProjectField(
        "image",
        typeof reader.result === "string" ? reader.result : ""
      );
      markProjectFieldTouched("image");
    };

    reader.readAsDataURL(file);
  };
  const updateBenefit = (index, field, value) =>
    setProjectForm((current) => ({
      ...current,
      benefits: current.benefits.map((benefit, benefitIndex) =>
        benefitIndex === index ? { ...benefit, [field]: value } : benefit
      ),
    }));
  const addBenefit = () =>
    setProjectForm((current) => ({
      ...current,
      benefits: [...current.benefits, createBenefit()],
    }));
  const removeBenefit = (index) =>
    setProjectForm((current) => ({
      ...current,
      benefits:
        current.benefits.length <= 2
          ? current.benefits
          : current.benefits.filter(
              (_, benefitIndex) => benefitIndex !== index
            ),
    }));
  const updateSubscriptionPlan = (index, field, value) =>
    setMembershipPlans((current) =>
      current.map((plan, planIndex) =>
        planIndex === index
          ? {
              ...plan,
              [field]: value,
              ...(field === "name"
                ? {
                    id: normalizePlanId(
                      value,
                      plan.id || `plan-${index + 1}`
                    ),
                  }
                : {}),
            }
          : plan
      )
    );
  const addSubscriptionPlan = () =>
    setMembershipPlans((current) => [
      ...current,
      createSubscriptionPlan({}, current.length),
    ]);
  const removeSubscriptionPlan = (index) =>
    setMembershipPlans((current) =>
      current.length <= 1
        ? current
        : current.filter((_, planIndex) => planIndex !== index)
    );
  const resetForm = () => {
    setProjectForm(emptyProject());
    setEditingProjectId(null);
    setNewAmenityName("");
    setProjectFieldTouched({});
    setBenefitFieldTouched({});
    setHasSubmittedProjectForm(false);
    setIsAmenityDropdownOpen(false);
  };
  const scrollToProjectForm = () => {
    window.requestAnimationFrame(() => {
      projectFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };
  const openAddProjectForm = () => {
    setActiveTab("projects");
    resetForm();
    scrollToProjectForm();
  };
  const editProject = (project) => {
    setProjectForm(mapProject(project));
    setEditingProjectId(project.id ?? project._id);
    setNewAmenityName("");
    setProjectFieldTouched({});
    setBenefitFieldTouched({});
    setHasSubmittedProjectForm(false);
    setIsAmenityDropdownOpen(false);
    setActiveTab("projects");
    scrollToProjectForm();
  };

  const submitProject = async (event) => {
    event.preventDefault();
    setHasSubmittedProjectForm(true);

    const hasProjectErrors = Object.values(projectFieldErrors).some(Boolean);
    const hasBenefitErrors = Object.values(benefitFieldErrors).some(Boolean);

    if (hasProjectErrors || hasBenefitErrors) {
      setMessage({
        type: "error",
        text: "Please enter the highlighted fields correctly.",
      });
      return;
    }

    setIsSavingProject(true);
    try {
      const payload = buildProjectPayload(projectForm);
      const url = editingProjectId
        ? `/projects/${editingProjectId}`
        : "/projects";
      const method = editingProjectId ? "PUT" : "POST";
      await requestJson(url, { method, body: JSON.stringify(payload) });
      await loadDashboardData({
        successMessage: editingProjectId
          ? "Project updated successfully."
          : "Project added successfully.",
      });
      resetForm();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSavingProject(false);
    }
  };

  const submitMembershipPlans = async (event) => {
    event.preventDefault();
    setHasSubmittedMembershipPlans(true);

    const hasErrors = Object.values(subscriptionPlanFieldErrors).some(Boolean);

    if (hasErrors) {
      setMessage({
        type: "error",
        text: "Please enter the membership plans correctly.",
      });
      return;
    }

    setIsSavingMembershipPlans(true);
    try {
      const payload = {
        plans: membershipPlans
          .filter((plan) => plan.name.trim())
          .map((plan, index) => ({
            id: normalizePlanId(plan.id || plan.name, `plan-${index + 1}`),
            name: plan.name.trim(),
            price: plan.price.trim(),
            description: plan.description.trim(),
            benefitAmount: plan.benefitAmount.trim(),
            features: plan.featuresInput
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          })),
      };

      await requestJson("/membership-plans", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setSubscriptionPlanFieldTouched({});
      setHasSubmittedMembershipPlans(false);
      await loadDashboardData({
        showLoader: false,
        successMessage: "Membership plans updated successfully.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSavingMembershipPlans(false);
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete this project from the admin catalog?")) return;
    try {
      await requestJson(`/projects/${projectId}`, { method: "DELETE" });
      if (editingProjectId === projectId) resetForm();
      await loadDashboardData({
        successMessage: "Project deleted successfully.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const updateInvestorStatus = async (investorId, status) => {
    try {
      await requestJson(`/investors/${investorId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadDashboardData({
        showLoader: false,
        successMessage: "Investor status updated.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const updateRequestStatus = async (request, value) => {
    try {
      const body =
        request.requestType === "benefitClaim"
          ? { subscriberStatus: value }
          : { status: value };

      await requestJson(`/requests/${request._id}/status`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      await loadDashboardData({
        showLoader: false,
        successMessage:
          request.requestType === "benefitClaim"
            ? "Subscriber status updated."
            : "Request status updated.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleRefreshData = async () => {
    await loadDashboardData({ successMessage: "Dashboard data refreshed." });
  };

  const openInvestorDetails = (investorId) => {
    setSelectedInvestorId(investorId);
    setSelectedRequestId(null);
  };

  const openRequestDetails = (requestId) => {
    setSelectedRequestId(requestId);
    setSelectedInvestorId(null);
  };
  const closeRequestDetails = () => {
    setSelectedRequestId(null);
  };

  const openAddSubscriberForm = () => {
    setSubscriberForm({
      id: null,
      fullName: "",
      phone: "",
      email: "",
      projectId: projects[0]?.id || projects[0]?._id || "",
      planId: membershipPlans[0]?.id || "",
    });
    setIsAddingSubscriber(true);
  };

  const editSubscriber = (request) => {
    setSubscriberForm({
      id: request._id,
      fullName: request.fullName || "",
      phone: request.phone || "",
      email: request.email || "",
      projectId: request.projectId || (projects[0]?.id || projects[0]?._id || ""),
      planId: request.planId || (membershipPlans[0]?.id || ""),
    });
    setIsAddingSubscriber(true);
  };

  const saveSubscriber = async (e) => {
    e.preventDefault();
    setIsSavingSubscriber(true);
    try {
      const project = projects.find(p => String(p.id || p._id) === String(subscriberForm.projectId));
      const plan = membershipPlans.find(p => String(p.id) === String(subscriberForm.planId));

      const payload = {
        requestType: "benefitClaim",
        fullName: subscriberForm.fullName,
        phone: subscriberForm.phone,
        email: subscriberForm.email,
        projectId: project ? (project.id || project._id) : 0,
        projectName: project?.name || "",
        builder: project?.builder || "",
        planId: plan?.id || "",
        planName: plan?.name || "",
        planPrice: plan?.price || "",
      };

      await requestJson(subscriberForm.id ? `/requests/${subscriberForm.id}` : "/requests", {
        method: subscriberForm.id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setIsAddingSubscriber(false);
      await loadDashboardData({ showLoader: false, successMessage: subscriberForm.id ? "Subscriber updated successfully." : "Subscriber added successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSavingSubscriber(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    history.replace("/login");
  };

  return (
    <S.PageShell>
      <S.BackgroundGlow />
      <S.AdminContainer>
        {message ? (
          <S.Notification $tone={message.type}>{message.text}</S.Notification>
        ) : null}
        <S.HeroCard>
          <S.HeroContent>
            <S.Eyebrow>
              <FontAwesomeIcon icon={faCrown} /> Heritoria Admin Suite
            </S.Eyebrow>
            <S.HeroTitle>
              Luxury operations, finally handled in one place.
            </S.HeroTitle>
            <S.HeroText>
              Manage the full project inventory, monitor investor demand, and
              track every premium site-visit or benefit request from one
              polished command center.
            </S.HeroText>
            <S.HeroActions>
              <S.PrimaryButton type="button" onClick={openAddProjectForm}>
                <FontAwesomeIcon icon={faPlus} /> Add New Project
              </S.PrimaryButton>
              <S.SecondaryButton
                type="button"
                onClick={handleRefreshData}
                disabled={isRefreshing}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />{" "}
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </S.SecondaryButton>
            </S.HeroActions>
          </S.HeroContent>
          <S.HeroAside>
            <S.HeroVisual>
              <S.VisualGlow />
              <S.VisualGrid />
              <S.FloatBadge $top={22} $left={22}>
                <FontAwesomeIcon icon={faBuilding} />
                <S.FloatBadgeValue>Portfolio Atlas</S.FloatBadgeValue>
              </S.FloatBadge>
              <S.FloatBadge $top={28} $right={24}>
                <FontAwesomeIcon icon={faBuilding} />
                <S.FloatBadgeValue>
                  {totals.featuredProjects || 0} featured projects
                </S.FloatBadgeValue>
              </S.FloatBadge>
              <S.FloatBadge $top={118} $right={92}>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                <S.FloatBadgeValue>
                  {totals.totalInvestors || 0} investor leads
                </S.FloatBadgeValue>
              </S.FloatBadge>
              <S.Skyline>
                {[
                  { width: 78, height: 126, tilt: -14 },
                  { width: 88, height: 172, tilt: -10 },
                  { width: 112, height: 214, tilt: -8 },
                  { width: 92, height: 182, tilt: -12 },
                  { width: 74, height: 136, tilt: -16 },
                ].map((building, buildingIndex) => (
                  <S.BuildingStack
                    key={`${building.width}-${building.height}-${buildingIndex}`}
                    $width={building.width}
                    $height={building.height}
                    $tilt={building.tilt}
                  >
                    <S.WindowGrid>
                      {Array.from({ length: 18 }).map((_, windowIndex) => (
                        <S.WindowCell
                          key={`${buildingIndex}-${windowIndex}`}
                          $lit={(windowIndex + buildingIndex) % 3 !== 0}
                        />
                      ))}
                    </S.WindowGrid>
                  </S.BuildingStack>
                ))}
              </S.Skyline>
            </S.HeroVisual>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Premium Catalog</S.ShowcaseLabel>
              <S.ShowcaseValue>
                {totals.totalProjects || 0} live projects
              </S.ShowcaseValue>
              <S.ShowcaseText>
                Live inventory connected to your CMS-ready backend.
              </S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Investor Interest</S.ShowcaseLabel>
              <S.ShowcaseValue>
                {totals.totalInvestors || 0} investor leads
              </S.ShowcaseValue>
              <S.ShowcaseText>
                Track consultation demand and follow-up priority.
              </S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Request Pipeline</S.ShowcaseLabel>
              <S.ShowcaseValue>
                {totals.totalRequests || 0} buyer requests
              </S.ShowcaseValue>
              <S.ShowcaseText>
                Benefit claims and visit bookings in one queue.
              </S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Featured Inventory</S.ShowcaseLabel>
              <S.ShowcaseValue>
                {totals.featuredProjects || 0} highlighted
              </S.ShowcaseValue>
              <S.ShowcaseText>
                Control homepage visibility for signature listings.
              </S.ShowcaseText>
            </S.ShowcaseCard>
          </S.HeroAside>
        </S.HeroCard>

        <S.StatsGrid>
          <S.StatCard>
            <S.StatValue>{totals.totalProjects || 0}</S.StatValue>
            <S.StatLabel>Projects in portfolio</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.totalInvestors || 0}</S.StatValue>
            <S.StatLabel>Investor leads captured</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.newRequests || 0}</S.StatValue>
            <S.StatLabel>Fresh requests awaiting action</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.siteVisitRequests || 0}</S.StatValue>
            <S.StatLabel>Site visits in the pipeline</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.totalSubscribers || 0}</S.StatValue>
            <S.StatLabel>Total subscribers</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.subscribedSubscribers || 0}</S.StatValue>
            <S.StatLabel>Subscribed</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.notUsedSubscribers || 0}</S.StatValue>
            <S.StatLabel>Not used</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>{totals.expiredSubscribers || 0}</S.StatValue>
            <S.StatLabel>Expired subscribers</S.StatLabel>
          </S.StatCard>
        </S.StatsGrid>

        <S.TabsRow>
          {[
            {
              id: "projects",
              label: "Projects",
              icon: faBuilding,
              count: projects.length,
            },
            {
              id: "investors",
              label: "Investors",
              icon: faHandshakeAngle,
              count: investors.length,
            },
            {
              id: "siteVisits",
              label: "Site Visits",
              icon: faHouseSignal,
              count: siteVisitRequests.length,
            },
            {
              id: "subscribers",
              label: "Subscribers",
              icon: faCrown,
              count: claimBenefitRequests.length,
            },
            {
              id: "membershipPlans",
              label: "Membership Plans",
              icon: faLayerGroup,
              count: membershipPlans.length,
            },
          ].map((tab) => (
            <S.TabButton
              key={tab.id}
              type="button"
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <FontAwesomeIcon icon={tab.icon} /> {tab.label} ({tab.count})
            </S.TabButton>
          ))}
        </S.TabsRow>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <div>
                <S.PanelTitle>
                  {activeTab === "projects"
                    ? "Project Inventory"
                    : activeTab === "investors"
                      ? "Investor Leads"
                      : activeTab === "requests"
                        ? "Client Request Desk"
                        : "Membership Plans"}
                </S.PanelTitle>
                <S.PanelSubtitle>
                  {activeTab === "projects"
                    ? "Browse the exact project records flowing to the public website."
                    : activeTab === "investors"
                      ? "Track every investor consultation request and move them through the funnel."
                      : activeTab === "requests"
                        ? "Review benefit claims and site visit bookings coming from project pages."
                        : "Manage one shared set of benefit subscription plans that appears across every project page."}
                </S.PanelSubtitle>
              </div>
              {activeTab === "projects" ? (
                <S.SearchInput
                  type="text"
                  placeholder="Search project, builder, location..."
                  value={projectSearch}
                  onChange={(event) => setProjectSearch(event.target.value)}
                />
              ) : (
                <S.SecondaryButton
                  type="button"
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                >
                  <FontAwesomeIcon icon={faLayerGroup} />{" "}
                  {isRefreshing ? "Refreshing..." : "Sync View"}
                </S.SecondaryButton>
              )}
            </S.PanelHeader>

            {isLoading ? (
              <S.EmptyState>Loading your dashboard data...</S.EmptyState>
            ) : activeTab === "projects" ? (
              <S.TableWrap>
                <S.Table>
                  <S.THead>
                    <S.TRow>
                      <S.TH>Image</S.TH>
                      <S.TH>Project</S.TH>
                      <S.TH>Status</S.TH>
                      <S.TH>Pricing</S.TH>
                      <S.TH>Benefits</S.TH>
                      <S.TH>Actions</S.TH>
                    </S.TRow>
                  </S.THead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <S.TRow key={project._id || project.id}>
                        <S.TD>
                          {project.image ? (
                            <S.RequestProjectThumb
                              src={project.image}
                              alt={project.name}
                            />
                          ) : null}
                        </S.TD>
                        <S.TD>
                          <S.ProjectName>{project.name}</S.ProjectName>
                          <S.ProjectMeta>
                            {project.builder} • {project.location}
                          </S.ProjectMeta>
                        </S.TD>
                        <S.TD>
                          <S.StatusBadge
                            $tone={project.featured ? "featured" : "info"}
                          >
                            {project.status}
                          </S.StatusBadge>
                          {project.featured ? (
                            <S.ProjectMeta>Featured project</S.ProjectMeta>
                          ) : null}
                        </S.TD>
                        <S.TD>
                          <S.ProjectName>{project.priceRange}</S.ProjectName>
                          <S.ProjectMeta>
                            {project.bhk} • {project.size}
                          </S.ProjectMeta>
                        </S.TD>
                        <S.TD>
                          <S.ProjectName>{project.benefitsWorth}</S.ProjectName>
                          <S.ProjectMeta>
                            {project.totalBenefitValue} value
                          </S.ProjectMeta>
                        </S.TD>
                        <S.TD>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="view"
                              onClick={() => setPreviewProject(project)}
                              aria-label="View project"
                              title="View project"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </S.TinyButton>
                            <S.TinyButton
                              type="button"
                              $variant="edit"
                              onClick={() => editProject(project)}
                              aria-label="Edit project"
                              title="Edit project"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </S.TinyButton>
                            <S.TinyButton
                              type="button"
                              $variant="danger"
                              onClick={() => deleteProject(project.id)}
                              aria-label="Delete project"
                              title="Delete project"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.TD>
                      </S.TRow>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            ) : activeTab === "membershipPlans" ? (
              <S.BenefitList>
                {membershipPlans.map((plan) => (
                  <S.BenefitCard key={plan.clientId}>
                    <S.ProjectName>{plan.name}</S.ProjectName>
                    <S.ProjectMeta>{plan.price}</S.ProjectMeta>
                    <S.ProjectMeta>{plan.description}</S.ProjectMeta>
                    <S.FieldHint>
                      Benefits Included: {plan.benefitAmount}
                    </S.FieldHint>
                  </S.BenefitCard>
                ))}
              </S.BenefitList>
            ) : activeTab === "investors" ? (
              <S.TableWrap>
                <S.Table>
                  <S.THead>
                    <S.TRow>
                      <S.TH>Investor</S.TH>
                      <S.TH>Budget</S.TH>
                      <S.TH>Timeline</S.TH>
                      <S.TH>Status</S.TH>
                      <S.TH>View</S.TH>
                    </S.TRow>
                  </S.THead>
                  <tbody>
                    {investors.map((investor) => (
                      <S.TRow key={investor._id}>
                        <S.TD>
                          <S.ProjectName>{investor.fullName}</S.ProjectName>
                          <S.ProjectMeta>
                            {investor.phone}
                            {investor.email ? ` | ${investor.email}` : ""}
                          </S.ProjectMeta>
                        </S.TD>
                        <S.TD>{investor.budget}</S.TD>
                        <S.TD>{investor.timeline || "Not specified"}</S.TD>
                        <S.TD>
                          <S.StatusBadge
                            $tone={toneForInvestor(investor.status)}
                          >
                            {formatStatusLabel(investor.status)}
                          </S.StatusBadge>
                        </S.TD>
                        <S.TD>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="view"
                              onClick={() => openInvestorDetails(investor._id)}
                              aria-label="View investor lead"
                              title="View investor lead"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.TD>
                      </S.TRow>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            ) : activeTab === "siteVisits" || activeTab === "requests" ? (
              <S.RequestGroups>
                <S.RequestGroup>
                  <S.RequestGroupHeader>
                    <div>
                      <S.RequestGroupTitle>Site Visits</S.RequestGroupTitle>
                      <S.RequestGroupMeta>
                        {siteVisitRequests.length} requests
                      </S.RequestGroupMeta>
                    </div>
                  </S.RequestGroupHeader>
                  {siteVisitRequests.length ? (
                    <S.TableWrap>
                      <S.Table>
                        <S.THead>
                          <S.TRow>
                            <S.TH>Customer</S.TH>
                            <S.TH>Project</S.TH>
                            <S.TH>Visit Slot</S.TH>
                            <S.TH>Status</S.TH>
                            <S.TH>View</S.TH>
                          </S.TRow>
                        </S.THead>
                        <tbody>
                          {siteVisitRequests.map((request) =>
                            (() => {
                              const project = getProjectForRequest(request);

                              return (
                                <S.TRow key={request._id}>
                                  <S.TD>
                                    <S.ProjectName>
                                      {request.fullName}
                                    </S.ProjectName>
                                    <S.ProjectMeta>
                                      {request.phone}
                                      {request.email
                                        ? ` | ${request.email}`
                                        : ""}
                                    </S.ProjectMeta>
                                  </S.TD>
                                  <S.TD>
                                    <S.RequestProjectCell>
                                      {project?.image ? (
                                        <S.RequestProjectThumb
                                          src={project.image}
                                          alt={request.projectName}
                                        />
                                      ) : null}
                                      <div>
                                        <S.ProjectName>
                                          {request.projectName}
                                        </S.ProjectName>
                                        <S.ProjectMeta>
                                          {request.builder ||
                                            "Builder not shared"}
                                        </S.ProjectMeta>
                                      </div>
                                    </S.RequestProjectCell>
                                  </S.TD>
                                  <S.TD>
                                    <S.ProjectName>
                                      {request.visitDate || "Date pending"}
                                    </S.ProjectName>
                                    <S.ProjectMeta>
                                      {request.timeSlot || "Time pending"} |{" "}
                                      {request.guests || 0} visitors
                                    </S.ProjectMeta>
                                  </S.TD>
                                  <S.TD>
                                    <S.StatusBadge
                                      $tone={toneForRequest(request.status)}
                                    >
                                      {formatStatusLabel(request.status)}
                                    </S.StatusBadge>
                                  </S.TD>
                                  <S.TD>
                                    <S.ActionRow>
                                      <S.TinyButton
                                        type="button"
                                        $variant="view"
                                        onClick={() =>
                                          openRequestDetails(request._id)
                                        }
                                        aria-label="View site visit request"
                                        title="View site visit request"
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </S.TinyButton>
                                    </S.ActionRow>
                                  </S.TD>
                                </S.TRow>
                              );
                            })()
                          )}
                        </tbody>
                      </S.Table>
                    </S.TableWrap>
                  ) : (
                    <S.EmptyState>No site visit requests yet.</S.EmptyState>
                  )}
                </S.RequestGroup>
              </S.RequestGroups>
            ) : activeTab === "subscribers" ? (
              <S.RequestGroups>
                <S.RequestGroup>
                <S.RequestGroupHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                      <S.RequestGroupTitle>Subscribers</S.RequestGroupTitle>
                      <S.RequestGroupMeta>
                        {claimBenefitRequests.length} subscribers
                      </S.RequestGroupMeta>
                  </div>
                  <S.PrimaryButton type="button" onClick={openAddSubscriberForm}>
                    <FontAwesomeIcon icon={faPlus} /> Add Subscriber
                  </S.PrimaryButton>
                </S.RequestGroupHeader>
                  {claimBenefitRequests.length ? (
                    <S.TableWrap>
                      <S.Table>
                        <S.THead>
                          <S.TRow>
                            <S.TH>Customer</S.TH>
                            <S.TH>Project</S.TH>
                            <S.TH>Plan</S.TH>
                            <S.TH>Status</S.TH>
                            <S.TH>View</S.TH>
                          </S.TRow>
                        </S.THead>
                        <tbody>
                          {claimBenefitRequests.map((request) =>
                            (() => {
                              const project = getProjectForRequest(request);

                              return (
                                <S.TRow key={request._id}>
                                  <S.TD>
                                    <S.ProjectName>
                                      {request.fullName}
                                    </S.ProjectName>
                                    <S.ProjectMeta>
                                      {request.phone}
                                      {request.email
                                        ? ` | ${request.email}`
                                        : ""}
                                    </S.ProjectMeta>
                                  </S.TD>
                                  <S.TD>
                                    <S.RequestProjectCell>
                                      {project?.image ? (
                                        <S.RequestProjectThumb
                                          src={project.image}
                                          alt={request.projectName}
                                        />
                                      ) : null}
                                      <div>
                                        <S.ProjectName>
                                          {request.projectName}
                                        </S.ProjectName>
                                        <S.ProjectMeta>
                                          {request.builder ||
                                            "Builder not shared"}
                                        </S.ProjectMeta>
                                      </div>
                                    </S.RequestProjectCell>
                                  </S.TD>
                                  <S.TD>
                                    <S.ProjectName>
                                      {request.planName || "Plan pending"}
                                    </S.ProjectName>
                                    <S.ProjectMeta>
                                      {request.preferredUnit ||
                                        "Unit preference not shared"}
                                    </S.ProjectMeta>
                                  </S.TD>
                                  <S.TD>
                                    <S.StatusBadge
                                      $tone={toneForSubscriberStatus(
                                        getSubscriberStatus(request)
                                      )}
                                    >
                                      {formatStatusLabel(
                                        getSubscriberStatus(request)
                                      )}
                                    </S.StatusBadge>
                                  </S.TD>
                                  <S.TD>
                                    <S.ActionRow>
                                      <S.TinyButton
                                        type="button"
                                        $variant="view"
                                        onClick={() =>
                                          openRequestDetails(request._id)
                                        }
                                        aria-label="View benefit claim request"
                                        title="View benefit claim request"
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </S.TinyButton>
                                    </S.ActionRow>
                                  </S.TD>
                                </S.TRow>
                              );
                            })()
                          )}
                        </tbody>
                      </S.Table>
                    </S.TableWrap>
                  ) : (
                    <S.EmptyState>No benefit claim requests yet.</S.EmptyState>
                  )}
                </S.RequestGroup>
              </S.RequestGroups>
            ) : null}
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <div>
                <S.PanelTitle>
                  {activeTab === "projects"
                    ? editingProjectId
                      ? "Edit Project"
                      : "Add Project"
                    : activeTab === "membershipPlans"
                      ? "Membership Plans Workspace"
                    : activeTab === "investors"
                      ? selectedInvestor
                        ? "Lead Details"
                        : "Investor Workspace"
                      : selectedRequest
                        ? "Request Details"
                        : "Request Workspace"}
                </S.PanelTitle>
                <S.PanelSubtitle>
                  {activeTab === "projects"
                    ? "All fields from the project catalog are available here, including amenities and benefit blocks."
                    : activeTab === "membershipPlans"
                      ? "Add, edit, and save the shared subscription plans used in the Claim Benefits popup across all projects."
                    : activeTab === "investors"
                      ? selectedInvestor
                        ? "Review the selected investor lead and update the status from here."
                        : "Select an investor lead from the table to view details and update actions here."
                      : selectedRequest
                        ? "Review the selected customer request, project image, and update its status from here."
                        : "Select a site visit or benefit claim to review complete customer details here."}
                </S.PanelSubtitle>
              </div>
              {activeTab === "projects" && editingProjectId ? (
                <S.TinyButton
                  type="button"
                  $variant="ghost"
                  onClick={() => resetForm()}
                >
                  Reset Form
                </S.TinyButton>
              ) : null}
              {activeTab === "membershipPlans" ? (
                <S.TinyButton
                  type="button"
                  $variant="ghost"
                  onClick={handleRefreshData}
                >
                  {isRefreshing ? "Refreshing..." : "Reload Plans"}
                </S.TinyButton>
              ) : null}
              {activeTab === "investors" && selectedInvestor ? (
                <S.TinyButton
                  type="button"
                  $variant="ghost"
                  onClick={() => setSelectedInvestorId(null)}
                >
                  Clear View
                </S.TinyButton>
              ) : null}
              {activeTab === "requests" && selectedRequest ? (
                <S.TinyButton
                  type="button"
                  $variant="ghost"
                  onClick={() => setSelectedRequestId(null)}
                >
                  Clear View
                </S.TinyButton>
              ) : null}
            </S.PanelHeader>

            <S.SidePanelBody>
              {activeTab === "projects" ? (
                <S.Form ref={projectFormRef} onSubmit={submitProject}>
                  <S.Field>
                    <S.Label>Status</S.Label>
                    <S.Select
                      value={projectForm.status}
                      onChange={(event) =>
                        setProjectField("status", event.target.value)
                      }
                    >
                      <option value="Under Construction">
                        Under Construction
                      </option>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Pre-Launch">Pre-Launch</option>
                    </S.Select>
                  </S.Field>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>Project Name</S.Label>
                      <S.Input
                        value={projectForm.name}
                        onChange={(event) =>
                          setProjectField("name", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("name")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.name}
                        $hasError={showProjectFieldError("name")}
                        required
                      />
                      {showProjectFieldError("name") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.name}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Builder</S.Label>
                      <S.Input
                        value={projectForm.builder}
                        onChange={(event) =>
                          setProjectField("builder", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("builder")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.builder}
                        $hasError={showProjectFieldError("builder")}
                        required
                      />
                      {showProjectFieldError("builder") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.builder}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>Location</S.Label>
                      <S.Input
                        value={projectForm.location}
                        onChange={(event) =>
                          setProjectField("location", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("location")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.location}
                        $hasError={showProjectFieldError("location")}
                        required
                      />
                      {showProjectFieldError("location") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.location}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Area</S.Label>
                      <S.Input
                        value={projectForm.area}
                        onChange={(event) =>
                          setProjectField("area", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("area")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.area}
                        $hasError={showProjectFieldError("area")}
                        required
                      />
                      {showProjectFieldError("area") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.area}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>Budget Label</S.Label>
                      <S.Input
                        value={projectForm.budget}
                        onChange={(event) =>
                          setProjectField("budget", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("budget")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.budget}
                        $hasError={showProjectFieldError("budget")}
                        required
                      />
                      {showProjectFieldError("budget") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.budget}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Budget Value</S.Label>
                      <S.Input
                        type="text"
                        value={projectForm.budgetValue}
                        onChange={(event) =>
                          setProjectField("budgetValue", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("budgetValue")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.budgetValue}
                        $hasError={showProjectFieldError("budgetValue")}
                        required
                      />
                      {showProjectFieldError("budgetValue") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.budgetValue}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>BHK</S.Label>
                      <S.Input
                        value={projectForm.bhk}
                        onChange={(event) =>
                          setProjectField("bhk", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("bhk")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.bhk}
                        $hasError={showProjectFieldError("bhk")}
                        required
                      />
                      {showProjectFieldError("bhk") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.bhk}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Size</S.Label>
                      <S.Input
                        value={projectForm.size}
                        onChange={(event) =>
                          setProjectField("size", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("size")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.size}
                        $hasError={showProjectFieldError("size")}
                        required
                      />
                      {showProjectFieldError("size") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.size}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.Field>
                    <S.Label>Image URL</S.Label>
                    <S.Input
                      value={projectForm.image}
                      onChange={(event) =>
                        setProjectField("image", event.target.value)
                      }
                      onBlur={() => markProjectFieldTouched("image")}
                      placeholder={PROJECT_FIELD_PLACEHOLDERS.image}
                      $hasError={showProjectFieldError("image")}
                      required
                    />
                    {showProjectFieldError("image") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.image}
                      </S.FieldMessage>
                    ) : null}
                  </S.Field>
                  <S.UploadCard>
                    <S.Label>Upload Project Image</S.Label>
                    <S.FileInput
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <S.UploadHint>
                      <FontAwesomeIcon icon={faCloudArrowUp} /> Upload a project
                      image from your device. It will be stored directly with
                      the project for now.
                    </S.UploadHint>
                    {projectForm.image ? (
                      <S.UploadPreview>
                        <S.PreviewImage
                          src={projectForm.image}
                          alt={projectForm.name || "Project preview"}
                        />
                      </S.UploadPreview>
                    ) : null}
                  </S.UploadCard>
                  <S.Field>
                    <S.Label>Description</S.Label>
                    <S.TextArea
                      value={projectForm.description}
                      onChange={(event) =>
                        setProjectField("description", event.target.value)
                      }
                      onBlur={() => markProjectFieldTouched("description")}
                      placeholder={PROJECT_FIELD_PLACEHOLDERS.description}
                      $hasError={showProjectFieldError("description")}
                      required
                    />
                    {showProjectFieldError("description") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.description}
                      </S.FieldMessage>
                    ) : null}
                  </S.Field>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>Possession</S.Label>
                      <S.Input
                        value={projectForm.possession}
                        onChange={(event) =>
                          setProjectField("possession", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("possession")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.possession}
                        $hasError={showProjectFieldError("possession")}
                        required
                      />
                      {showProjectFieldError("possession") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.possession}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Unit Types</S.Label>
                      <S.Input
                        value={projectForm.unitTypes}
                        onChange={(event) =>
                          setProjectField("unitTypes", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("unitTypes")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.unitTypes}
                        $hasError={showProjectFieldError("unitTypes")}
                        required
                      />
                      {showProjectFieldError("unitTypes") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.unitTypes}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field>
                      <S.Label>Price Range</S.Label>
                      <S.Input
                        value={projectForm.priceRange}
                        onChange={(event) =>
                          setProjectField("priceRange", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("priceRange")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.priceRange}
                        $hasError={showProjectFieldError("priceRange")}
                        required
                      />
                      {showProjectFieldError("priceRange") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.priceRange}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                    <S.Field>
                      <S.Label>Benefits Worth</S.Label>
                      <S.Input
                        value={projectForm.benefitsWorth}
                        onChange={(event) =>
                          setProjectField("benefitsWorth", event.target.value)
                        }
                        onBlur={() => markProjectFieldTouched("benefitsWorth")}
                        placeholder={PROJECT_FIELD_PLACEHOLDERS.benefitsWorth}
                        $hasError={showProjectFieldError("benefitsWorth")}
                        required
                      />
                      {showProjectFieldError("benefitsWorth") ? (
                        <S.FieldMessage>
                          {projectFieldErrors.benefitsWorth}
                        </S.FieldMessage>
                      ) : null}
                    </S.Field>
                  </S.FieldGrid>
                  <S.Field>
                    <S.Label>Total Benefit Value</S.Label>
                    <S.Input
                      value={projectForm.totalBenefitValue}
                      onChange={(event) =>
                        setProjectField("totalBenefitValue", event.target.value)
                      }
                      onBlur={() =>
                        markProjectFieldTouched("totalBenefitValue")
                      }
                      placeholder={PROJECT_FIELD_PLACEHOLDERS.totalBenefitValue}
                      $hasError={showProjectFieldError("totalBenefitValue")}
                      required
                    />
                    {showProjectFieldError("totalBenefitValue") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.totalBenefitValue}
                      </S.FieldMessage>
                    ) : (
                      <S.FieldHint>
                        This value is used in the Claim Benefits popup text, for
                        example: unlock benefits worth ₹6L.
                      </S.FieldHint>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label>Amenities</S.Label>
                    <S.AmenityDropdown ref={amenityDropdownRef}>
                      <S.AmenityDropdownTrigger
                        type="button"
                        $open={isAmenityDropdownOpen}
                        $hasError={showProjectFieldError("amenitiesInput")}
                        onClick={() =>
                          setIsAmenityDropdownOpen(
                            (currentValue) => !currentValue
                          )
                        }
                      >
                        <S.AmenityTriggerText>
                          {selectedAmenities.length
                            ? `${selectedAmenities.length} amenities selected`
                            : "Select amenities"}
                        </S.AmenityTriggerText>
                        <S.AmenityTriggerIcon>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </S.AmenityTriggerIcon>
                      </S.AmenityDropdownTrigger>

                      {isAmenityDropdownOpen ? (
                        <S.AmenityDropdownMenu>
                          {amenityOptions.map((amenity) => (
                            <S.AmenityOptionRow
                              key={amenity}
                              $selected={selectedAmenities.includes(amenity)}
                            >
                              <S.AmenityOptionCheckbox
                                type="checkbox"
                                checked={selectedAmenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                              />
                              <span>{amenity}</span>
                            </S.AmenityOptionRow>
                          ))}
                          <S.AmenityCreateRow>
                            <S.Input
                              type="text"
                              value={newAmenityName}
                              onChange={(event) =>
                                setNewAmenityName(event.target.value)
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  handleAddAmenity();
                                }
                              }}
                              placeholder="Add new amenity"
                              $hasError={Boolean(newAmenityError)}
                            />
                            <S.AmenityCreateButton
                              type="button"
                              onClick={handleAddAmenity}
                              disabled={
                                !newAmenityName.trim() ||
                                Boolean(newAmenityError) ||
                                isSavingAmenity
                              }
                            >
                              {isSavingAmenity ? "Adding..." : "Add"}
                            </S.AmenityCreateButton>
                          </S.AmenityCreateRow>
                          {newAmenityError ? (
                            <S.FieldMessage>{newAmenityError}</S.FieldMessage>
                          ) : null}
                        </S.AmenityDropdownMenu>
                      ) : null}
                    </S.AmenityDropdown>
                    {selectedAmenities.length ? (
                      <S.SelectedAmenities>
                        {selectedAmenities.map((amenity) => (
                          <S.SelectedAmenityChip
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            aria-label={`Remove ${amenity}`}
                            title={`Remove ${amenity}`}
                          >
                            <span>{amenity}</span>
                            <S.SelectedAmenityRemoveIcon>
                              <FontAwesomeIcon icon={faXmark} />
                            </S.SelectedAmenityRemoveIcon>
                          </S.SelectedAmenityChip>
                        ))}
                      </S.SelectedAmenities>
                    ) : (
                      <S.SelectionHint>
                        Select multiple amenities from the dropdown above, or
                        add a new amenity.
                      </S.SelectionHint>
                    )}
                    {showProjectFieldError("amenitiesInput") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.amenitiesInput}
                      </S.FieldMessage>
                    ) : (
                      <S.FieldHint>
                        Choose amenities from the dropdown or add your own.
                        Click a selected amenity or the x mark to remove it.
                      </S.FieldHint>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label>Location Address</S.Label>
                    <S.Input
                      value={projectForm.locationAddress}
                      onChange={(event) =>
                        setProjectField("locationAddress", event.target.value)
                      }
                      onBlur={() => markProjectFieldTouched("locationAddress")}
                      placeholder={PROJECT_FIELD_PLACEHOLDERS.locationAddress}
                      $hasError={showProjectFieldError("locationAddress")}
                      required
                    />
                    {showProjectFieldError("locationAddress") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.locationAddress}
                      </S.FieldMessage>
                    ) : (
                      <S.FieldHint>
                        Enter correctly. Example: Financial District,
                        Gachibowli, Hyderabad
                      </S.FieldHint>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label>Google Maps Link</S.Label>
                    <S.Input
                      value={projectForm.googleMapsLink}
                      onChange={(event) =>
                        setProjectField("googleMapsLink", event.target.value)
                      }
                      onBlur={() => markProjectFieldTouched("googleMapsLink")}
                      placeholder={PROJECT_FIELD_PLACEHOLDERS.googleMapsLink}
                      $hasError={showProjectFieldError("googleMapsLink")}
                      required
                    />
                    {showProjectFieldError("googleMapsLink") ? (
                      <S.FieldMessage>
                        {projectFieldErrors.googleMapsLink}
                      </S.FieldMessage>
                    ) : null}
                  </S.Field>
                  <S.CheckboxRow>
                    <S.CheckboxInput
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(event) =>
                        setProjectField("featured", event.target.checked)
                      }
                    />
                    Feature this project on the public experience
                  </S.CheckboxRow>
                  <S.Divider />
                  <div>
                    <S.PanelTitle
                      style={{ fontSize: "1rem", marginBottom: "14px" }}
                    >
                      Benefit Cards
                    </S.PanelTitle>
                    <S.BenefitList>
                      {projectForm.benefits.map((benefit, index) => (
                        <S.BenefitCard key={benefit.clientId}>
                          <S.FieldGrid>
                            <S.Field>
                              <S.Label>Title</S.Label>
                              <S.Input
                                value={benefit.title}
                                onChange={(event) =>
                                  updateBenefit(
                                    index,
                                    "title",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markBenefitFieldTouched(index, "title")
                                }
                                placeholder={BENEFIT_FIELD_PLACEHOLDERS.title}
                                $hasError={showBenefitFieldError(
                                  index,
                                  "title"
                                )}
                                required
                              />
                              {showBenefitFieldError(index, "title") ? (
                                <S.FieldMessage>
                                  {benefitFieldErrors[`${index}-title`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                            <S.Field>
                              <S.Label>Value</S.Label>
                              <S.Input
                                value={benefit.value}
                                onChange={(event) =>
                                  updateBenefit(
                                    index,
                                    "value",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markBenefitFieldTouched(index, "value")
                                }
                                placeholder={BENEFIT_FIELD_PLACEHOLDERS.value}
                                $hasError={showBenefitFieldError(
                                  index,
                                  "value"
                                )}
                                required
                              />
                              {showBenefitFieldError(index, "value") ? (
                                <S.FieldMessage>
                                  {benefitFieldErrors[`${index}-value`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                          </S.FieldGrid>
                          <S.Field>
                            <S.Label>Icon</S.Label>
                            <S.Select
                              value={benefit.icon}
                              onChange={(event) =>
                                updateBenefit(index, "icon", event.target.value)
                              }
                            >
                              <option value="kitchen">Kitchen</option>
                              <option value="automation">Automation</option>
                              <option value="inspection">Inspection</option>
                            </S.Select>
                          </S.Field>
                          <S.Field>
                            <S.Label>Description</S.Label>
                            <S.TextArea
                              value={benefit.description}
                              onChange={(event) =>
                                updateBenefit(
                                  index,
                                  "description",
                                  event.target.value
                                )
                              }
                              onBlur={() =>
                                markBenefitFieldTouched(index, "description")
                              }
                              placeholder={
                                BENEFIT_FIELD_PLACEHOLDERS.description
                              }
                              rows={3}
                              $hasError={showBenefitFieldError(
                                index,
                                "description"
                              )}
                              required
                            />
                            {showBenefitFieldError(index, "description") ? (
                              <S.FieldMessage>
                                {benefitFieldErrors[`${index}-description`]}
                              </S.FieldMessage>
                            ) : null}
                          </S.Field>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="ghost"
                              onClick={() => removeBenefit(index)}
                              disabled={projectForm.benefits.length <= 2}
                            >
                              Remove Benefit
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.BenefitCard>
                      ))}
                    </S.BenefitList>
                  </div>
                  <S.ActionRow>
                    <S.TinyButton
                      type="button"
                      $variant="ghost"
                      onClick={addBenefit}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Benefit
                    </S.TinyButton>
                  </S.ActionRow>
                  {false ? (
                    <>
                  <S.Divider />
                  <div>
                    <S.PanelTitle
                      style={{ fontSize: "1rem", marginBottom: "8px" }}
                    >
                      Membership Plans
                    </S.PanelTitle>
                    <S.PanelSubtitle style={{ marginBottom: "14px" }}>
                      These plans appear in the Claim Benefits popup under
                      “Membership Plans” and “Choose a benefit subscription” for
                      this project. You can add new subscriptions here or
                      update the existing Basic, Premium, and Elite plans.
                    </S.PanelSubtitle>
                    <S.BenefitList>
                      {projectForm.subscriptionPlans.map((plan, index) => (
                        <S.BenefitCard key={plan.clientId}>
                          <S.FieldGrid>
                            <S.Field>
                              <S.Label>Plan Name</S.Label>
                              <S.Input
                                value={plan.name}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "name",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(index, "name")
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.name
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "name"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(index, "name") ? (
                                <S.FieldMessage>
                                  {subscriptionPlanFieldErrors[`${index}-name`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                            <S.Field>
                              <S.Label>Price</S.Label>
                              <S.Input
                                value={plan.price}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "price",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(index, "price")
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.price
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "price"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(index, "price") ? (
                                <S.FieldMessage>
                                  {subscriptionPlanFieldErrors[`${index}-price`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                          </S.FieldGrid>
                          <S.FieldGrid>
                            <S.Field>
                              <S.Label>Benefits Included</S.Label>
                              <S.Input
                                value={plan.benefitAmount}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "benefitAmount",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(
                                    index,
                                    "benefitAmount"
                                  )
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.benefitAmount
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "benefitAmount"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(
                                index,
                                "benefitAmount"
                              ) ? (
                                <S.FieldMessage>
                                  {
                                    subscriptionPlanFieldErrors[
                                      `${index}-benefitAmount`
                                    ]
                                  }
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                            <S.Field>
                              <S.Label>Plan Description</S.Label>
                              <S.Input
                                value={plan.description}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "description",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(
                                    index,
                                    "description"
                                  )
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.description
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "description"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(
                                index,
                                "description"
                              ) ? (
                                <S.FieldMessage>
                                  {
                                    subscriptionPlanFieldErrors[
                                      `${index}-description`
                                    ]
                                  }
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                          </S.FieldGrid>
                          <S.Field>
                            <S.Label>Plan Features</S.Label>
                            <S.TextArea
                              value={plan.featuresInput}
                              onChange={(event) =>
                                updateSubscriptionPlan(
                                  index,
                                  "featuresInput",
                                  event.target.value
                                )
                              }
                              onBlur={() =>
                                markSubscriptionPlanFieldTouched(
                                  index,
                                  "featuresInput"
                                )
                              }
                              placeholder={
                                SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.featuresInput
                              }
                              rows={4}
                              $hasError={showSubscriptionPlanFieldError(
                                index,
                                "featuresInput"
                              )}
                              required
                            />
                            {showSubscriptionPlanFieldError(
                              index,
                              "featuresInput"
                            ) ? (
                              <S.FieldMessage>
                                {
                                  subscriptionPlanFieldErrors[
                                    `${index}-featuresInput`
                                  ]
                                }
                              </S.FieldMessage>
                            ) : (
                              <S.FieldHint>
                                Enter one feature per line. These points will
                                show in the Claim Benefits modal.
                              </S.FieldHint>
                            )}
                          </S.Field>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="ghost"
                              onClick={() => removeSubscriptionPlan(index)}
                              disabled={projectForm.subscriptionPlans.length <= 1}
                            >
                              Remove Plan
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.BenefitCard>
                      ))}
                    </S.BenefitList>
                  </div>
                  <S.ActionRow>
                    <S.TinyButton
                      type="button"
                      $variant="ghost"
                      onClick={addSubscriptionPlan}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Plan
                    </S.TinyButton>
                  </S.ActionRow>
                    </>
                  ) : null}
                  <S.HeroActions>
                    <S.PrimaryButton type="submit" disabled={isSavingProject}>
                      {editingProjectId ? "Update Project" : "Publish Project"}
                    </S.PrimaryButton>
                    <S.SecondaryButton
                      type="button"
                      onClick={() => resetForm()}
                    >
                      Clear Form
                    </S.SecondaryButton>
                  </S.HeroActions>
                </S.Form>
              ) : activeTab === "membershipPlans" ? (
                <S.Form onSubmit={submitMembershipPlans}>
                  <S.SelectionHint>
                    These subscription plans are shared across every project.
                    Update them once here and the Claim Benefits popup will use
                    the same plans site-wide.
                  </S.SelectionHint>
                  <div>
                    <S.PanelTitle
                      style={{ fontSize: "1rem", marginBottom: "8px" }}
                    >
                      Shared Membership Plans
                    </S.PanelTitle>
                    <S.PanelSubtitle style={{ marginBottom: "14px" }}>
                      Add, edit, or remove the plans shown in the public
                      Membership Plans popup.
                    </S.PanelSubtitle>
                    <S.BenefitList>
                      {membershipPlans.map((plan, index) => (
                        <S.BenefitCard key={plan.clientId}>
                          <S.FieldGrid>
                            <S.Field>
                              <S.Label>Plan Name</S.Label>
                              <S.Input
                                value={plan.name}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "name",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(index, "name")
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.name
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "name"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(index, "name") ? (
                                <S.FieldMessage>
                                  {subscriptionPlanFieldErrors[`${index}-name`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                            <S.Field>
                              <S.Label>Price</S.Label>
                              <S.Input
                                value={plan.price}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "price",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(index, "price")
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.price
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "price"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(index, "price") ? (
                                <S.FieldMessage>
                                  {subscriptionPlanFieldErrors[`${index}-price`]}
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                          </S.FieldGrid>
                          <S.FieldGrid>
                            <S.Field>
                              <S.Label>Benefits Included</S.Label>
                              <S.Input
                                value={plan.benefitAmount}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "benefitAmount",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(
                                    index,
                                    "benefitAmount"
                                  )
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.benefitAmount
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "benefitAmount"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(
                                index,
                                "benefitAmount"
                              ) ? (
                                <S.FieldMessage>
                                  {
                                    subscriptionPlanFieldErrors[
                                      `${index}-benefitAmount`
                                    ]
                                  }
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                            <S.Field>
                              <S.Label>Plan Description</S.Label>
                              <S.Input
                                value={plan.description}
                                onChange={(event) =>
                                  updateSubscriptionPlan(
                                    index,
                                    "description",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markSubscriptionPlanFieldTouched(
                                    index,
                                    "description"
                                  )
                                }
                                placeholder={
                                  SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.description
                                }
                                $hasError={showSubscriptionPlanFieldError(
                                  index,
                                  "description"
                                )}
                                required
                              />
                              {showSubscriptionPlanFieldError(
                                index,
                                "description"
                              ) ? (
                                <S.FieldMessage>
                                  {
                                    subscriptionPlanFieldErrors[
                                      `${index}-description`
                                    ]
                                  }
                                </S.FieldMessage>
                              ) : null}
                            </S.Field>
                          </S.FieldGrid>
                          <S.Field>
                            <S.Label>Plan Features</S.Label>
                            <S.TextArea
                              value={plan.featuresInput}
                              onChange={(event) =>
                                updateSubscriptionPlan(
                                  index,
                                  "featuresInput",
                                  event.target.value
                                )
                              }
                              onBlur={() =>
                                markSubscriptionPlanFieldTouched(
                                  index,
                                  "featuresInput"
                                )
                              }
                              placeholder={
                                SUBSCRIPTION_PLAN_FIELD_PLACEHOLDERS.featuresInput
                              }
                              rows={4}
                              $hasError={showSubscriptionPlanFieldError(
                                index,
                                "featuresInput"
                              )}
                              required
                            />
                            {showSubscriptionPlanFieldError(
                              index,
                              "featuresInput"
                            ) ? (
                              <S.FieldMessage>
                                {
                                  subscriptionPlanFieldErrors[
                                    `${index}-featuresInput`
                                  ]
                                }
                              </S.FieldMessage>
                            ) : (
                              <S.FieldHint>
                                Enter one feature per line. These points will
                                show in the Claim Benefits modal.
                              </S.FieldHint>
                            )}
                          </S.Field>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="ghost"
                              onClick={() => removeSubscriptionPlan(index)}
                              disabled={membershipPlans.length <= 1}
                            >
                              Remove Plan
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.BenefitCard>
                      ))}
                    </S.BenefitList>
                  </div>
                  <S.ActionRow>
                    <S.TinyButton
                      type="button"
                      $variant="ghost"
                      onClick={addSubscriptionPlan}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Plan
                    </S.TinyButton>
                  </S.ActionRow>
                  <S.HeroActions>
                    <S.PrimaryButton
                      type="submit"
                      disabled={isSavingMembershipPlans}
                    >
                      {isSavingMembershipPlans
                        ? "Saving Plans..."
                        : "Save Membership Plans"}
                    </S.PrimaryButton>
                    <S.SecondaryButton
                      type="button"
                      onClick={handleRefreshData}
                    >
                      Reload Plans
                    </S.SecondaryButton>
                  </S.HeroActions>
                </S.Form>
              ) : activeTab === "investors" && selectedInvestor ? (
                <>
                  <S.DetailCard>
                    <S.DetailHeader>
                      <div>
                        <S.DetailEyebrow>Investor Lead</S.DetailEyebrow>
                        <S.DetailTitle>
                          {selectedInvestor.fullName}
                        </S.DetailTitle>
                        <S.DetailMeta>
                          {formatDateTime(selectedInvestor.createdAt)}
                        </S.DetailMeta>
                      </div>
                      <S.StatusBadge
                        $tone={toneForInvestor(selectedInvestor.status)}
                      >
                        {formatStatusLabel(selectedInvestor.status)}
                      </S.StatusBadge>
                    </S.DetailHeader>

                    <S.DetailGrid>
                      <S.DetailItem>
                        <S.DetailLabel>Phone</S.DetailLabel>
                        <S.DetailValue>{selectedInvestor.phone}</S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Email</S.DetailLabel>
                        <S.DetailValue>
                          {selectedInvestor.email || "Not shared"}
                        </S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Budget</S.DetailLabel>
                        <S.DetailValue>{selectedInvestor.budget}</S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Timeline</S.DetailLabel>
                        <S.DetailValue>
                          {selectedInvestor.timeline || "Not specified"}
                        </S.DetailValue>
                      </S.DetailItem>
                    </S.DetailGrid>
                  </S.DetailCard>

                  <S.DetailSectionCard>
                    <S.DetailSectionTitle>Notes</S.DetailSectionTitle>
                    <S.PreviewText>
                      {selectedInvestor.notes ||
                        "No notes shared for this investor lead yet."}
                    </S.PreviewText>
                  </S.DetailSectionCard>

                  <S.DetailSectionCard>
                    <S.DetailSectionTitle>
                      Update Lead Status
                    </S.DetailSectionTitle>
                    <S.DetailActionRow>
                      <S.TinyButton
                        type="button"
                        disabled={
                          isRefreshing ||
                          selectedInvestor.status === "contacted"
                        }
                        onClick={() =>
                          updateInvestorStatus(
                            selectedInvestor._id,
                            "contacted"
                          )
                        }
                      >
                        Contacted
                      </S.TinyButton>
                      <S.TinyButton
                        type="button"
                        disabled={
                          isRefreshing ||
                          selectedInvestor.status === "qualified"
                        }
                        onClick={() =>
                          updateInvestorStatus(
                            selectedInvestor._id,
                            "qualified"
                          )
                        }
                      >
                        Qualified
                      </S.TinyButton>
                      <S.TinyButton
                        type="button"
                        $variant="ghost"
                        disabled={
                          isRefreshing || selectedInvestor.status === "closed"
                        }
                        onClick={() =>
                          updateInvestorStatus(selectedInvestor._id, "closed")
                        }
                      >
                        Close
                      </S.TinyButton>
                    </S.DetailActionRow>
                  </S.DetailSectionCard>
                </>
              ) : (activeTab === "siteVisits" || activeTab === "subscribers" || activeTab === "requests") && selectedRequest ? (
                <>
                  <S.DetailCard>
                    <S.DetailHeader>
                      <div>
                        <S.DetailEyebrow>
                          {getRequestTypeLabel(selectedRequest.requestType)}
                        </S.DetailEyebrow>
                        <S.DetailTitle>
                          {selectedRequest.fullName}
                        </S.DetailTitle>
                        <S.DetailMeta>
                          {formatDateTime(selectedRequest.createdAt)}
                        </S.DetailMeta>
                      </div>
                      <S.StatusBadge
                        $tone={
                          selectedRequest.requestType === "siteVisit"
                            ? toneForRequest(selectedRequest.status)
                            : toneForSubscriberStatus(
                                getSubscriberStatus(selectedRequest)
                              )
                        }
                      >
                        {formatStatusLabel(
                          selectedRequest.requestType === "siteVisit"
                            ? selectedRequest.status
                            : getSubscriberStatus(selectedRequest)
                        )}
                      </S.StatusBadge>
                    </S.DetailHeader>

                    {selectedRequestProject?.image ? (
                      <S.DetailImageWrap>
                        <S.DetailImage
                          src={selectedRequestProject.image}
                          alt={selectedRequest.projectName}
                        />
                      </S.DetailImageWrap>
                    ) : null}

                    <S.DetailGrid>
                      <S.DetailItem>
                        <S.DetailLabel>Project</S.DetailLabel>
                        <S.DetailValue>
                          {selectedRequest.projectName}
                        </S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Builder</S.DetailLabel>
                        <S.DetailValue>
                          {selectedRequest.builder || "Builder not shared"}
                        </S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Phone</S.DetailLabel>
                        <S.DetailValue>{selectedRequest.phone}</S.DetailValue>
                      </S.DetailItem>
                      <S.DetailItem>
                        <S.DetailLabel>Email</S.DetailLabel>
                        <S.DetailValue>
                          {selectedRequest.email || "Not shared"}
                        </S.DetailValue>
                      </S.DetailItem>
                    </S.DetailGrid>
                  </S.DetailCard>

                  <S.DetailSectionCard>
                    <S.DetailSectionTitle>
                      {selectedRequest.requestType === "siteVisit"
                        ? "Site Visit Details"
                        : "Subscriber Details"}
                    </S.DetailSectionTitle>
                    <S.DetailGrid>
                      {selectedRequest.requestType === "siteVisit" ? (
                        <>
                          <S.DetailItem>
                            <S.DetailLabel>Visit Date</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequest.visitDate || "Date pending"}
                            </S.DetailValue>
                          </S.DetailItem>
                          <S.DetailItem>
                            <S.DetailLabel>Time Slot</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequest.timeSlot || "Time pending"}
                            </S.DetailValue>
                          </S.DetailItem>
                          <S.DetailItem>
                            <S.DetailLabel>Visitors</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequest.guests || "0"}
                            </S.DetailValue>
                          </S.DetailItem>
                          <S.DetailItem>
                            <S.DetailLabel>Selected Project</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequestProject?.name ||
                                selectedRequest.projectName}
                            </S.DetailValue>
                          </S.DetailItem>
                        </>
                      ) : (
                        <>
                          <S.DetailItem>
                            <S.DetailLabel>Plan</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequest.planName || "Plan pending"}
                            </S.DetailValue>
                          </S.DetailItem>
                        <S.DetailItem>
                          <S.DetailLabel>Plan Price</S.DetailLabel>
                          <S.DetailValue>
                            {selectedRequest.planPrice || "Price pending"}
                          </S.DetailValue>
                        </S.DetailItem>
                        <S.DetailItem>
                          <S.DetailLabel>Subscriber Status</S.DetailLabel>
                          <S.DetailValue>
                            {formatStatusLabel(
                              getSubscriberStatus(selectedRequest)
                            )}
                          </S.DetailValue>
                        </S.DetailItem>
                        <S.DetailItem>
                          <S.DetailLabel>Preferred Unit</S.DetailLabel>
                          <S.DetailValue>
                            {selectedRequest.preferredUnit ||
                                "Unit preference not shared"}
                            </S.DetailValue>
                          </S.DetailItem>
                          <S.DetailItem>
                            <S.DetailLabel>Selected Project</S.DetailLabel>
                            <S.DetailValue>
                              {selectedRequestProject?.name ||
                                selectedRequest.projectName}
                            </S.DetailValue>
                          </S.DetailItem>
                        <S.DetailItem>
                          <S.DetailLabel>Expired On</S.DetailLabel>
                          <S.DetailValue>
                            {selectedRequest.expiredAt
                              ? formatDateTime(selectedRequest.expiredAt)
                              : "Active subscription"}
                          </S.DetailValue>
                        </S.DetailItem>
                      </>
                    )}
                  </S.DetailGrid>
                </S.DetailSectionCard>

                  <S.DetailSectionCard>
                    <S.DetailSectionTitle>Customer Notes</S.DetailSectionTitle>
                    <S.PreviewText>
                      {selectedRequest.notes ||
                        "No extra notes shared for this request yet."}
                    </S.PreviewText>
                  </S.DetailSectionCard>

                  <S.DetailSectionCard>
                    <S.DetailSectionTitle>
                      {selectedRequest.requestType === "siteVisit"
                        ? "Update Request Status"
                        : "Update Subscriber Status"}
                    </S.DetailSectionTitle>
                    <S.DetailActionRow>
                      {selectedRequest.requestType === "siteVisit" ? (
                        <>
                          <S.TinyButton
                            type="button"
                            disabled={
                              isRefreshing ||
                              selectedRequest.status === "inProgress"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "inProgress")
                            }
                          >
                            In Progress
                          </S.TinyButton>
                          <S.TinyButton
                            type="button"
                            disabled={
                              isRefreshing ||
                              selectedRequest.status === "scheduled"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "scheduled")
                            }
                          >
                            Schedule
                          </S.TinyButton>
                          <S.TinyButton
                            type="button"
                            $variant="ghost"
                            disabled={
                              isRefreshing || selectedRequest.status === "closed"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "closed")
                            }
                          >
                            Close
                          </S.TinyButton>
                        </>
                      ) : (
                        <>
                          <S.TinyButton
                            type="button"
                            disabled={
                              isRefreshing ||
                              getSubscriberStatus(selectedRequest) === "subscribed"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "subscribed")
                            }
                          >
                            Subscribed
                          </S.TinyButton>
                          <S.TinyButton
                            type="button"
                            disabled={
                              isRefreshing ||
                              getSubscriberStatus(selectedRequest) === "notUsed"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "notUsed")
                            }
                          >
                            Not Used
                          </S.TinyButton>
                          <S.TinyButton
                            type="button"
                            $variant="ghost"
                            disabled={
                              isRefreshing ||
                              getSubscriberStatus(selectedRequest) === "expired"
                            }
                            onClick={() =>
                              updateRequestStatus(selectedRequest, "expired")
                            }
                          >
                            Used / Expire
                          </S.TinyButton>
                        </>
                      )}
                    </S.DetailActionRow>
                  </S.DetailSectionCard>
                </>
              ) : (
                <>
                  <S.InsightList>
                    <S.InsightCard>
                      <S.InsightLabel>Featured Inventory</S.InsightLabel>
                      <S.InsightValue>
                        {totals.featuredProjects || 0} featured projects are
                        positioned to impress high-intent buyers.
                      </S.InsightValue>
                    </S.InsightCard>
                    <S.InsightCard>
                      <S.InsightLabel>Warm Investor Leads</S.InsightLabel>
                      <S.InsightValue>
                        {totals.openInvestorLeads || 0} investors still need a
                        call-back or qualification update.
                      </S.InsightValue>
                    </S.InsightCard>
                    <S.InsightCard>
                      <S.InsightLabel>Total Subscribers</S.InsightLabel>
                      <S.InsightValue>
                        {totals.totalSubscribers || 0} subscribers are enrolled
                        to use project benefits.
                      </S.InsightValue>
                    </S.InsightCard>
                    <S.InsightCard>
                      <S.InsightLabel>Expired Subscribers</S.InsightLabel>
                      <S.InsightValue>
                        {totals.expiredSubscribers || 0} subscribers have
                        already used benefits and expired.
                      </S.InsightValue>
                    </S.InsightCard>
                  </S.InsightList>
                  <div>
                    <S.PanelTitle
                      style={{ fontSize: "1rem", marginBottom: "14px" }}
                    >
                      Recent Activity
                    </S.PanelTitle>
                    <S.ActivityList>
                      {recentItems.map((item) => (
                        <S.ActivityItem key={item._id}>
                          <S.ActivityTitle>
                            {activeTab === "investors"
                              ? item.fullName
                              : `${item.requestType === "siteVisit" ? "Site Visit" : "Subscriber"} • ${item.projectName}`}
                          </S.ActivityTitle>
                          <S.ActivityMeta>
                            {activeTab === "investors"
                              ? `${item.budget} • ${item.phone}`
                              : `${item.fullName} • ${item.phone}`}
                            <br />
                            {formatDateTime(item.createdAt)}
                          </S.ActivityMeta>
                        </S.ActivityItem>
                      ))}
                    </S.ActivityList>
                  </div>
                </>
              )}
            </S.SidePanelBody>
          </S.Panel>
        </S.ContentGrid>
      </S.AdminContainer>
      {previewProject ? (
        <S.PreviewBackdrop onClick={() => setPreviewProject(null)}>
          <S.PreviewModal onClick={(event) => event.stopPropagation()}>
            <S.PreviewHeader>
              <div>
                <S.PreviewTitle>{previewProject.name}</S.PreviewTitle>
                <S.PreviewMeta>
                  {previewProject.builder} • {previewProject.location} •{" "}
                  {previewProject.status}
                </S.PreviewMeta>
              </div>
              <S.CloseButton
                type="button"
                onClick={() => setPreviewProject(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </S.CloseButton>
            </S.PreviewHeader>

            <S.PreviewBody>
              <div>
                <S.PreviewImageWrap>
                  <S.ModalPreviewImage
                    src={previewProject.image}
                    alt={previewProject.name}
                  />
                </S.PreviewImageWrap>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>
                    Project Overview
                  </S.PreviewSectionTitle>
                  <S.PreviewText>{previewProject.description}</S.PreviewText>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Amenities</S.PreviewSectionTitle>
                  <S.PreviewChips>
                    {(previewProject.amenities || []).map((amenity) => (
                      <S.PreviewChip key={amenity}>{amenity}</S.PreviewChip>
                    ))}
                  </S.PreviewChips>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Benefits</S.PreviewSectionTitle>
                  <S.PreviewChips>
                    {(previewProject.benefits || []).map((benefit) => (
                      <S.PreviewChip key={`${benefit.id}-${benefit.title}`}>
                        {benefit.title}: {benefit.value}
                      </S.PreviewChip>
                    ))}
                  </S.PreviewChips>
                </S.PreviewSection>
              </div>

              <div>
                <S.PreviewSection>
                  <S.PreviewSectionTitle>Key Details</S.PreviewSectionTitle>
                  <S.PreviewStats>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Price Range</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.priceRange}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>BHK</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.bhk}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Size</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.size}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Possession</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.possession}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Unit Types</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.unitTypes}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Benefits Worth</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {previewProject.benefitsWorth}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                  </S.PreviewStats>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Location</S.PreviewSectionTitle>
                  <S.PreviewText>
                    {previewProject.locationAddress}
                  </S.PreviewText>
                </S.PreviewSection>
              </div>
            </S.PreviewBody>
          </S.PreviewModal>
        </S.PreviewBackdrop>
      ) : null}
      {selectedRequest ? (
        <S.PreviewBackdrop onClick={closeRequestDetails}>
          <S.PreviewModal onClick={(event) => event.stopPropagation()}>
            <S.PreviewHeader>
              <div>
                <S.PreviewTitle>{selectedRequest.fullName}</S.PreviewTitle>
                <S.PreviewMeta>
                  {getRequestTypeLabel(selectedRequest.requestType)} |{" "}
                  {selectedRequest.projectName} |{" "}
                  {formatDateTime(selectedRequest.createdAt)}
                </S.PreviewMeta>
              </div>
              <S.CloseButton type="button" onClick={closeRequestDetails}>
                <FontAwesomeIcon icon={faXmark} />
              </S.CloseButton>
            </S.PreviewHeader>

            <S.PreviewBody>
              <div>
                <S.PreviewImageWrap>
                  {selectedRequestProject?.image ? (
                    <S.ModalPreviewImage
                      src={selectedRequestProject.image}
                      alt={selectedRequest.projectName}
                    />
                  ) : (
                    <S.RequestImageFallback>
                      <FontAwesomeIcon icon={faBuilding} />
                      Selected project image not available
                    </S.RequestImageFallback>
                  )}
                </S.PreviewImageWrap>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Project Details</S.PreviewSectionTitle>
                  <S.PreviewStats>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Project</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequest.projectName}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Builder</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequest.builder || "Builder not shared"}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Project Status</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequestProject?.status || "Not available"}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Price Range</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequestProject?.priceRange || "Not available"}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                  </S.PreviewStats>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Customer Notes</S.PreviewSectionTitle>
                  <S.PreviewText>
                    {selectedRequest.notes ||
                      "No extra notes shared for this request yet."}
                  </S.PreviewText>
                </S.PreviewSection>
              </div>

              <div>
                <S.PreviewSection>
                  <S.PreviewSectionTitle>
                    Customer Details
                  </S.PreviewSectionTitle>
                  <S.PreviewStats>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Phone</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequest.phone}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Email</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {selectedRequest.email || "Not shared"}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Request Type</S.PreviewStatLabel>
                      <S.PreviewStatValue>
                        {getRequestTypeLabel(selectedRequest.requestType)}
                      </S.PreviewStatValue>
                    </S.PreviewStat>
                      <S.PreviewStat>
                        <S.PreviewStatLabel>Status</S.PreviewStatLabel>
                        <S.PreviewStatValue>
                        {formatStatusLabel(
                          selectedRequest.requestType === "siteVisit"
                            ? selectedRequest.status
                            : getSubscriberStatus(selectedRequest)
                        )}
                        </S.PreviewStatValue>
                      </S.PreviewStat>
                  </S.PreviewStats>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>
                    {selectedRequest.requestType === "siteVisit"
                      ? "Visit Details"
                      : "Subscriber Details"}
                  </S.PreviewSectionTitle>
                  <S.PreviewStats>
                    {selectedRequest.requestType === "siteVisit" ? (
                      <>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Visit Date</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.visitDate || "Date pending"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Time Slot</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.timeSlot || "Time pending"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Visitors</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.guests || "0"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Project</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequestProject?.name ||
                              selectedRequest.projectName}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                      </>
                      ) : (
                        <>
                          <S.PreviewStat>
                            <S.PreviewStatLabel>Plan</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.planName || "Plan pending"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Plan Price</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.planPrice || "Price pending"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Subscriber Status</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {formatStatusLabel(
                              getSubscriberStatus(selectedRequest)
                            )}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>
                            Preferred Unit
                          </S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.preferredUnit ||
                              "Unit preference not shared"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Project</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequestProject?.name ||
                              selectedRequest.projectName}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                        <S.PreviewStat>
                          <S.PreviewStatLabel>Expired On</S.PreviewStatLabel>
                          <S.PreviewStatValue>
                            {selectedRequest.expiredAt
                              ? formatDateTime(selectedRequest.expiredAt)
                              : "Active subscription"}
                          </S.PreviewStatValue>
                        </S.PreviewStat>
                      </>
                    )}
                  </S.PreviewStats>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>
                    {selectedRequest.requestType === "siteVisit"
                      ? "Update Request Status"
                      : "Update Subscriber Status"}
                  </S.PreviewSectionTitle>
                  <S.DetailActionRow>
                    {selectedRequest.requestType === "siteVisit" ? (
                      <>
                        <S.TinyButton
                          type="button"
                          disabled={
                            isRefreshing || selectedRequest.status === "inProgress"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "inProgress")
                          }
                        >
                          In Progress
                        </S.TinyButton>
                        <S.TinyButton
                          type="button"
                          disabled={
                            isRefreshing || selectedRequest.status === "scheduled"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "scheduled")
                          }
                        >
                          {getRequestCompletionLabel(selectedRequest.requestType)}
                        </S.TinyButton>
                        <S.TinyButton
                          type="button"
                          $variant="ghost"
                          disabled={
                            isRefreshing || selectedRequest.status === "closed"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "closed")
                          }
                        >
                          Close
                        </S.TinyButton>
                      </>
                    ) : (
                      <>
                        <S.TinyButton
                          type="button"
                          disabled={
                            isRefreshing ||
                            getSubscriberStatus(selectedRequest) === "subscribed"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "subscribed")
                          }
                        >
                          Subscribed
                        </S.TinyButton>
                        <S.TinyButton
                          type="button"
                          disabled={
                            isRefreshing ||
                            getSubscriberStatus(selectedRequest) === "notUsed"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "notUsed")
                          }
                        >
                          Not Used
                        </S.TinyButton>
                        <S.TinyButton
                          type="button"
                          $variant="ghost"
                          disabled={
                            isRefreshing ||
                            getSubscriberStatus(selectedRequest) === "expired"
                          }
                          onClick={() =>
                            updateRequestStatus(selectedRequest, "expired")
                          }
                        >
                          Used / Expire
                        </S.TinyButton>
                        <S.TinyButton
                          type="button"
                          onClick={() => editSubscriber(selectedRequest)}
                        >
                          Edit Details
                        </S.TinyButton>
                      </>
                    )}
                  </S.DetailActionRow>
                </S.PreviewSection>
              </div>
            </S.PreviewBody>
          </S.PreviewModal>
        </S.PreviewBackdrop>
      ) : null}

      {isAddingSubscriber ? (
        <S.PreviewBackdrop onClick={() => setIsAddingSubscriber(false)}>
          <S.PreviewModal onClick={(e) => e.stopPropagation()}>
            <S.PreviewHeader>
              <S.PreviewTitle>{subscriberForm.id ? "Edit Subscriber" : "Add New Subscriber"}</S.PreviewTitle>
              <S.TinyButton type="button" $variant="ghost" onClick={() => setIsAddingSubscriber(false)}>
                Close
              </S.TinyButton>
            </S.PreviewHeader>
            <S.PreviewBody>
              <form onSubmit={saveSubscriber}>
                  <S.Field>
                    <S.Label>Full Name*</S.Label>
                    <S.Input
                      required
                      value={subscriberForm.fullName}
                      onChange={(e) => setSubscriberForm(curr => ({...curr, fullName: e.target.value}))}
                      placeholder="John Doe"
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Phone Number*</S.Label>
                    <S.Input
                      required
                      value={subscriberForm.phone}
                      onChange={(e) => setSubscriberForm(curr => ({...curr, phone: e.target.value}))}
                      placeholder="+91 9876543210"
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Email Address</S.Label>
                    <S.Input
                      type="email"
                      value={subscriberForm.email}
                      onChange={(e) => setSubscriberForm(curr => ({...curr, email: e.target.value}))}
                      placeholder="john@example.com"
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Select Project*</S.Label>
                    <S.Select
                      required
                      value={subscriberForm.projectId}
                      onChange={(e) => setSubscriberForm(curr => ({...curr, projectId: e.target.value}))}
                    >
                      <option value="" disabled>Select Project</option>
                      {projects.map(p => (
                        <option key={p.id || p._id} value={p.id || p._id}>{p.name}</option>
                      ))}
                    </S.Select>
                  </S.Field>
                  <S.Field>
                    <S.Label>Select Plan*</S.Label>
                    <S.Select
                      required
                      value={subscriberForm.planId}
                      onChange={(e) => setSubscriberForm(curr => ({...curr, planId: e.target.value}))}
                    >
                      <option value="" disabled>Select Plan</option>
                      {membershipPlans.map(p => (
                        <option key={p.id} value={p.id}>{p.name} - {p.price}</option>
                      ))}
                    </S.Select>
                  </S.Field>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <S.SecondaryButton type="button" onClick={() => setIsAddingSubscriber(false)}>Cancel</S.SecondaryButton>
                  <S.PrimaryButton type="submit" disabled={isSavingSubscriber}>
                    {isSavingSubscriber ? "Saving..." : subscriberForm.id ? "Save Changes" : "Save Subscriber"}
                  </S.PrimaryButton>
                </div>
              </form>
            </S.PreviewBody>
          </S.PreviewModal>
        </S.PreviewBackdrop>
      ) : null}
    </S.PageShell>
  );
};

export default AdminDashboard;
