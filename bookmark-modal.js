document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('editBookmarkModal');
    const saveBtn = document.getElementById('saveModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');
    const modalBookmarkId = document.getElementById('modalBookmarkId');
    const modalCollectionId = document.getElementById('modalCollectionId');
    const modalBookmarkName = document.getElementById('modalBookmarkName');
    const modalBookmarkUrl = document.getElementById('modalBookmarkUrl');
    const modalBookmarkDesc = document.getElementById('modalBookmarkDesc');

    // Function to open the modal and populate it with data
    window.openEditModal = (collectionId, bookmarkId) => {
        const collection = bookmarkManagerData.collections.find(c => c.id === collectionId);
        if (!collection) return;
        const bookmark = collection.bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) return;

        modalCollectionId.value = collectionId;
        modalBookmarkId.value = bookmarkId;
        modalBookmarkName.value = bookmark.customTitle || bookmark.title;
        modalBookmarkUrl.value = bookmark.url;
        modalBookmarkDesc.value = bookmark.description || '';

        modal.style.display = 'block';
    };

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Event listeners
    cancelBtn.addEventListener('click', closeModal);
    saveBtn.addEventListener('click', () => {
        const collectionId = modalCollectionId.value;
        const bookmarkId = modalBookmarkId.value;
        const collection = bookmarkManagerData.collections.find(c => c.id === collectionId);
        if (!collection) return;
        const bookmark = collection.bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) return;

        bookmark.customTitle = modalBookmarkName.value;
        bookmark.url = modalBookmarkUrl.value;
        bookmark.description = modalBookmarkDesc.value;
        bookmark.lastModified = Date.now();
        collection.lastModified = Date.now();

        saveToLocalStorage();
        renderCollections();
        closeModal();
    });

    // Close modal if user clicks outside of it
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
});