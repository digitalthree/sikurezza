const CODE_RE = /[?&]code=[^&]+/;
const STATE_RE = /[?&]state=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export const isAuth0RedirectUrl = (searchParams = window.location.search): boolean =>
    (CODE_RE.test(searchParams) && STATE_RE.test(searchParams)) || ERROR_RE.test(searchParams);


export const LOCAL_STORAGE_TEMPORARY_ORG_KEY = 'organization';
export const LOCAL_STORAGE_AUTHORISED_ORG_KEY = 'authorisedOrganization';

export const setTemporaryOrganization = (org: string) => {
    sessionStorage.setItem(LOCAL_STORAGE_TEMPORARY_ORG_KEY, org);
}

export const setAuthorisedOrganizationFromTemporaryStorage = () => {
    localStorage.setItem(
        LOCAL_STORAGE_AUTHORISED_ORG_KEY,
        sessionStorage.getItem(LOCAL_STORAGE_TEMPORARY_ORG_KEY)!
    );
}

export const getTemporaryOrganization = (): string | null => {
    const orgString = sessionStorage.getItem(LOCAL_STORAGE_TEMPORARY_ORG_KEY);
    return orgString ? orgString : null;
}

export const getAuthorisedOrganization = (): string | null =>{
    const orgString = localStorage.getItem(LOCAL_STORAGE_AUTHORISED_ORG_KEY);
    return orgString ? orgString : null;
}

export const clearOrganizationStorages = () => {
    sessionStorage.removeItem(LOCAL_STORAGE_TEMPORARY_ORG_KEY);
    localStorage.removeItem(LOCAL_STORAGE_AUTHORISED_ORG_KEY);
}